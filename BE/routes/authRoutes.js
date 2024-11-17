import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { configDotenv } from 'dotenv';
import { createOrUpdateUser,getAllUsers,getUserWithEmail } from '../controllers/userController.js';

configDotenv();
const router = express.Router();
router.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/auth/google/callback");

router.get('/google', (req, res) => {

    const { state } = req.query;
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        state: state,
    });
    return res.json({redirectURL:url});
});

router.get('/google/callback', async (req, res) => {
    try {
        const { code, location } = req.query;
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

        let userResponse = await createOrUpdateUser(name,email,googleId,"google");

        const secret = process.env.JWTSecret;
        const token = jwt.sign({ data: email }, secret, { expiresIn: '12h' });
        res.cookie('JWT',token);

        res.redirect(`http://localhost:4200/explore/home/${location}`)
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
        const secret = process.env.JWTSecret;
        const parseJWT = jwt.verify(JWT_TOKEN,secret);
        return res.json({ loggedIn: true, user: parseJWT });
    }catch (error) {
        console.error('Error during session check:', error);
    }
})

router.post('/facebook-authentication',async(req,res)=>{
    try{
        const {id,email} = req.body;
        const secret = process.env.JWTSecret;
        const token = jwt.sign({ data: email }, secret, { expiresIn: '12h' });
        res.cookie('JWT',token);
        return res.json({success:true,message:"Cookie Created"})
    }catch(error){
        return res.json({success:false,message:error})
    }
})

//
router.post('/createUser',createOrUpdateUser);

router.get('/getAllUser',getAllUsers);

router.get('/userData',getUserWithEmail)

export default router;