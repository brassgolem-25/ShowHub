import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { configDotenv } from 'dotenv';
import { userController } from '../controllers/userController.js';
import { postgreClient } from '../config/postgre.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { redisClient } from "../config/redis.js";


configDotenv();
const router = express.Router();
router.use(express.json());


const userControlMethod = new userController();


router.get('/google', userControlMethod.googleRedirectURI);

router.get('/google/callback', userControlMethod.googleAuthentication);

router.get('/check-session', userControlMethod.checkSession)

router.post('/facebook-authentication', userControlMethod.facebookAuthentication)

router.get('/generate-token', userControlMethod.generateAuthToken)

router.post('/createUser', userControlMethod.createOrUpdateUser);

router.get('/getAllUsers', authenticate, authorize('admin'), userControlMethod.getAllUsers);

router.get('/userData', userControlMethod.getUserWithEmail);

router.get('/getCurrentlyLoggedInUser',userControlMethod. getCurrentlyLoggedInUser);

router.get('/logoutUser', userControlMethod.logoutUser);

export default router;