import pkg from 'pg';
import { configDotenv } from 'dotenv';

const {Client} = pkg;
configDotenv();

const dbpass = process.env.POSTGRE_PASS;
const postgreClient = new Client({
    user: 'postgres',
	password: `${dbpass}`,
	host: 'localhost',
	port: '5432',
	database: 'ShowHub',
    // ssl: {
    //     rejectUnauthorized: false,
    //   },
})

const connectPostgre = async() =>{
    try{
        await postgreClient.connect();
        console.log("Connected to Postgre SQL");
    }catch(err){
        console.log("Error connection to Postgre",err);
    }
};


export {connectPostgre,postgreClient};