import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const secret = process.env.JWTSecret;
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach decoded user data to the request
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};

export  {authenticate,authorize};