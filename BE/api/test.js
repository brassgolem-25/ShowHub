import express from 'express';
import {redisClient} from '../config/redis.js'
const router = express.Router();
router.use(express.json());

router.get('/',(req,res)=>{
    res.send({"data":"working"})
})

router.get('/redis',async(req,res)=>{
    try{
        const value = await redisClient.get('name');
        res.json({value:value})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default router;