import express from 'express';
const router = express.Router();
router.use(express.json());

router.get('/',(req,res)=>{
    res.send({"data":"working"})
})

export default router;