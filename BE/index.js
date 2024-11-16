import express from 'express';
import testRoute from './api/test.js'
import loginRoute from './api/login.js'
import mongooseConnect from './config/db.js'
import movieRoute from './routes/movieRoutes.js'
import theaterRoute from './routes/theaterRoutes.js'
import showTimeRoute from './routes/showTimeRoutes.js'
import authRoute from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app's URL
    credentials: true // Allows cookies to be sent
}));
app.use(cookieParser());

let connection = await mongooseConnect();
console.log(connection);
//test 
app.use('/api/test',testRoute)
//login
app.use('/api/login',loginRoute)

//movie
app.use('/api/movies',movieRoute)

//theater
app.use('/api/theater',theaterRoute)

//showTime
app.use('/api/showTime',showTimeRoute)

//Authentication
app.use('/auth',authRoute)

app.listen(3000 || process.env.port , (req,res)=>{
    console.log("Listening on port 3000");
})