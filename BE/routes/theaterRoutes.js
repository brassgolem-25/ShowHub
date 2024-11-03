import express from 'express';
import {getAllTheaters,createTheater} from '../controllers/theaterController.js'
const router = express.Router();
router.use(express.json());

router.post('/',createTheater);

router.get('/all',getAllTheaters);

// router.get('/few',getFewMovies);

// router.get('/movieDetails/:name/:id',getMovieDetails);

export default router;