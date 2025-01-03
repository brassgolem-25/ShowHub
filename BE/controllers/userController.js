import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { redisClient } from '../config/redis.js';
import { postgreClient } from '../config/postgre.js';
import { OAuth2Client } from 'google-auth-library';

configDotenv();

export class userController {
  constructor() {

  }
  client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/auth/google/callback");
  secret = process.env.JWTSecret;
  // Create a new User entry
  createOrUpdateOAuthUser = async (name, email, oAuthID, provider) => {
    try {
      const providerFieldMapping = {
        google: 'googleOauthId',
        facebook: 'metaId',
        apple: 'appleId',
      };
      const oAuthField = providerFieldMapping[provider];
      if (!oAuthField) {
        throw new Error('Invalid OAuth provider.');
      }
      const cachedUser = await redisClient.hGet(email,'timeStamp');
      if (cachedUser) {
        await redisClient.DEL(email);
        return {message:"In redis"}
      }
      const user = await this.findUserInDB(email,oAuthField,oAuthID);

      if (user) {
        if( user[oAuthField] == oAuthID  ){
          return { message: "User already Exists" }
        } else {
          await this.updateUserInDB(email,oAuthField,oAuthID);
          return { message: "User updated" }
        }
      }
      await this.createUserInDB(name, email, oAuthField, oAuthID);
      return { message: "User Created" }
    } catch (error) {
      throw error;
    }
  };

  // Get all Users
  getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { _id: 0, __v: 0 });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  //get User with Email
  getUserWithEmail = async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) {
        return res.json({ message: "No Email Found" })
      }
      const user = await User.findOne({ email }, { name: 1, email: 1, _id: 0 });
      if (!user) return res.json({ message: "No User found!" });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //Get LoggedIn User
  getCurrentlyLoggedInUser = async (req, res) => {
    try {
      const result = await postgreClient.query(`select count(id)  from sessions where is_active='true'`);
      const rowCount = result.rows[0];
      res.json(rowCount)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //Generate Auth Token
  generateAuthToken = async (req, res) => {
    try {
      const { email } = req.query;
      const result = (await postgreClient.query(`select count(*)  from user_role where email_id = $1`, [email])).rows[0].count;
      if (result > 0) {
        const token = jwt.sign({ email: email, role: 'admin' }, secret, { expiresIn: '12h' });
        return res.send(token);
      }
      return res.status(400).send('Invalid credentials');
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //redirect and generate google url
  googleRedirectURI = (req, res) => {
    const uri = req.query['uri'];
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      state: encodeURIComponent(uri),
    });
    return res.json({ redirectURL: url });
  }

  //Google Authentication
  googleAuthentication = async (req, res) => {
    try {
      const { code, state } = req.query;
      const { tokens } = await this.client.getToken(code);
      this.client.setCredentials(tokens);

      const ticket = await this.client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const googleId = payload['sub'];
      const email = payload['email'];
      const name = payload['name'];

      let userResponse = await this.createOrUpdateOAuthUser(name, email, googleId, "google");
      const redirectURL = decodeURIComponent(state);

      const token = jwt.sign({ data: email }, this.secret, { expiresIn: '12h' });
      res.cookie('JWT', token);

      return res.redirect(`http://localhost:4200${redirectURL}`)
    } catch (error) {
      console.error('Error during Google OAuth callback:', error);
    }
  }

  //Facebook Authentication
  facebookAuthentication = async (req, res) => {
    try {
      const { id, name, email, redirect_uri } = req.body;
      const redirectURL = decodeURIComponent(redirect_uri);
      let userResponse = await this.createOrUpdateOAuthUser(name, email, id, "facebook", req, res);
      const token = jwt.sign({ data: email }, this.secret, { expiresIn: '12h' });
      res.cookie('JWT', token);
      return res.json({ success: true, redirect_uri: redirectURL })
    } catch (error) {
      return res.json({ success: false, message: error })
    }
  }

  //CHECKSESSION
  checkSession = async (req, res) => {
    try {
      const JWT_TOKEN = req.cookies.JWT;
      if (JWT_TOKEN === undefined) {
        return res.json({ loggedIn: false });
      }
      const parseJWT = jwt.verify(JWT_TOKEN, this.secret);
      const redisRes = await redisClient.hGet(parseJWT.data, 'timeStamp');
      if (redisRes) {
        return res.json({ loggedIn: false });
      }
      return res.json({ loggedIn: true, user: parseJWT, redisRes: redisRes });
    } catch (error) {
      res.json({ loggedIn: false, message: error.message });
    }
  }

  //LOGOUT USER 
  logoutUser = async (req, res) => {
    try {
      //clear cookie
      const JWT_TOKEN = req.cookies.JWT;
      const { data, iat, exp } = jwt.decode(JWT_TOKEN);
      const timeStampObj = {
        iat: iat,
        exp: exp
      }
      const redisRes = await redisClient.hSet(data, 'timeStamp', JSON.stringify(timeStampObj));
      res.clearCookie('JWT');
      res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  //Helper Function
  findUserInDB = async (email, oAuthField, oAuthID) => {
    return await User.findOne({ $or: [{ [oAuthField]: oAuthID }, { email: email }] }, { _id: 0, __v: 0 })
  }

  updateUserInDB = async(email, oAuthField, oAuthID) => {
    return  await User.updateOne({ email: email }, { $set: { [oAuthField]: oAuthID } })
  }

  createUserInDB = async(name, email, oAuthField, oAuthID) =>{
    const user = new User({
      name,
      email,
      [oAuthField]: oAuthID
    });
    await user.save();
  }
}
