import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const url = process.env.MONGODB_URI;

const mongooseConnect = async () => {
    try {
        await mongoose.connect(url);
        return "MongoDB Cluster Connected";
    }catch(error){
        console.log(error);
    }
}

export default mongooseConnect;
