import express from 'express';
import testRoute from './api/test.js'
import loginRoute from './api/login.js'
import mongooseConnect from './config/mongo.js'
import {connectRedis} from './config/redis.js'
import { connectPostgre } from './config/postgre.js';
import { checkClusterHealth } from './config/opensearch.js';
import movieRoute from './routes/movieRoutes.js'
import theaterRoute from './routes/theaterRoutes.js'
import showTimeRoute from './routes/showTimeRoutes.js'
import authRoute from './routes/authRoutes.js'
import cityRoute from './routes/cityRoute.js'  
import liveEventRoute from './routes/liveEventRoute.js' 
import etlRoute from './routes/etlRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:4200','http://43.205.253.123'], // Your Angular app's URL
    credentials: true // Allows cookies to be sent
}));
// app.use(cors())
app.use(cookieParser());

let connection = await mongooseConnect();
console.log(connection);

//connect to redis
await connectRedis();

//connect to postgre
await connectPostgre();

//check cluster health of opensearch
await checkClusterHealth();

//test 
app.use('/api/test',testRoute)
//login
app.use('/api/login',loginRoute)

//movie
app.use('/api/movies',movieRoute)

//theater
app.use('/api/theatre',theaterRoute)

//showTime
app.use('/api/showTime',showTimeRoute)

//city
app.use('/api/city',cityRoute)

//live events
app.use('/api/liveEvents',liveEventRoute)

//Authentication
app.use('/auth',authRoute)

//ETL ,inserting data
app.use('/api/etl',etlRoute)

app.listen(3000 || process.env.port , (req,res)=>{
    console.log("Listening on port 3000");
})