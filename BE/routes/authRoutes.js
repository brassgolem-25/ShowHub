import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { configDotenv } from 'dotenv';
import { createOrUpdateUser,getAllUsers,getUserWithEmail,getCurrentlyLoggedInUser } from '../controllers/userController.js';
import { postgreClient } from '../config/postgre.js';
import {authenticate,authorize} from '../middleware/authMiddleware.js';


configDotenv();
const router = express.Router();
router.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/auth/google/callback");
const secret = process.env.JWTSecret;

router.get('/google', (req, res) => {
    const uri = req.query['uri'];
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        state:encodeURIComponent(uri),
    });
    return res.json({redirectURL:url});
});

router.get('/google/callback', async (req, res) => {
    try {
        const { code, state } = req.query;
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        let userResponse = await createOrUpdateUser(name,email,googleId,"google",req,res);
        const redirectURL = decodeURIComponent(state);
        
        const token = jwt.sign({ data: email }, secret, { expiresIn: '12h' });
        res.cookie('JWT',token);
        console.log(userResponse);
    
        return res.redirect(`http://localhost:4200${redirectURL}`)
    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
    }
});

router.get('/check-session',async (req,res)=>{
    try{
        const JWT_TOKEN = req.cookies.JWT;
        if(JWT_TOKEN===undefined){
            return res.json({loggedIn:false});
        }
        
        const parseJWT = jwt.verify(JWT_TOKEN,secret);
        return res.json({ loggedIn: true, user: parseJWT });
    }catch (error) {
        console.error('Error during session check:', error);
    }
})

router.post('/facebook-authentication',async(req,res)=>{
    try{
        const {id,name,email,redirect_uri} = req.body;
        const redirectURL = decodeURIComponent(redirect_uri); 
        let userResponse = await createOrUpdateUser(name,email,id,"facebook",req,res);
        const token = jwt.sign({ data: email }, secret, { expiresIn: '12h' });
        res.cookie('JWT',token);
        return res.json({success:true,redirect_uri:redirectURL})
    }catch(error){
        return res.json({success:false,message:error})
    }
})

router.get('/generate-token',async(req,res)=>{
    try{
        const {email}  = req.query;
        const result = (await postgreClient.query(`select count(*)  from user_role where email_id = $1`,[email])).rows[0].count;
        if(result>0){
        const token = jwt.sign({ email: email ,role:'admin'}, secret, { expiresIn: '12h' });
        return res.send(token);
        }
        return res.status(400).send('Invalid credentials');
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
//
router.post('/createUser',createOrUpdateUser);

router.get('/getAllUsers',authenticate,authorize('admin'),getAllUsers);

router.get('/userData',getUserWithEmail);

router.get('/getCurrentlyLoggedInUser',getCurrentlyLoggedInUser);



export default router;