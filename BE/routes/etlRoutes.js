import express from 'express';
import { ETLProcessController } from '../controllers/etlController.js';

const router = express.Router();
router.use(express.json());

const etlProcess = new ETLProcessController();

router.get('/loadTheater',etlProcess.loadTheater);

router.get('/loadShowtimes',etlProcess.loadShowtimes);


export default router;
