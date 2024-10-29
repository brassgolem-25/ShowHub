import express from 'express';
const router = express.Router();
router.use(express.json());

router.post('/',(req,res)=>{
    console.log(req.body);
    return res.send({"data":"working"})
})

export default router;