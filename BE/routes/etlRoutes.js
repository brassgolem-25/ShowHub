import express from 'express';
import { ETLProcessController } from '../controllers/etlController.js';

const router = express.Router();
router.use(express.json());

const etlProcess = new ETLProcessController();

router.get('/',etlProcess.loadTheater);

export default router;
