import express from 'express';
import testRoute from './api/test.js'
import loginRoute from './api/login.js'
import mongooseConnect from './config/db.js'
import movieRoute from './routes/movieRoutes.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

let connection = await mongooseConnect();
console.log(connection);
//test 
app.use('/api/test',testRoute)
//login
app.use('/api/login',loginRoute)

app.use('/api/movies',movieRoute)

app.listen(3000 || process.env.port , (req,res)=>{
    console.log("Listening on port 3000");
})