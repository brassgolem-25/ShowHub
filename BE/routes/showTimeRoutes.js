import express from 'express';
import { createShowtime,getAllShowtimes,getShowTimeDetails } from '../controllers/showTimeController.js';
const router = express.Router();
router.use(express.json());

router.post('/',createShowtime);

router.get('/all',getAllShowtimes);

router.post('/showTimeDetails',getShowTimeDetails);


// router.get('/few',getFewMovies);

// router.get('/movieDetails/:name/:id',getMovieDetails);

export default router;