import express from 'express';
import { ShowTimeController} from '../controllers/showTimeController.js';
const router = express.Router();
router.use(express.json());


router.get('/showTimeDetails',ShowTimeController.getShowTimeDetails);


export default router;