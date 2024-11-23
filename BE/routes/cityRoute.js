import { insertCities,getCitiesList } from "../controllers/cityController.js";
import {authenticate,authorize} from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();
router.use(express.json());

router.post('/insertCities',authenticate,authorize('admin') ,insertCities);

router.get('/getCitiesList',getCitiesList);

export default router;
