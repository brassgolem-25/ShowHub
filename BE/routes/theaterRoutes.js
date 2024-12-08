import express from 'express';
import {TheaterController} from '../controllers/theaterController.js'
const router = express.Router();
router.use(express.json());

router.post('/theatreDetails',TheaterController.getTheatreForMovie)

router.post('/getCurrentlyRunningMovieByLocation',TheaterController.getCurrentlyRunningMovieByLocation);

export default router;