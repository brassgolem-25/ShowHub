import express from 'express';
import {getAllMovies,getFewMovies,createMovie, getMovieDetails} from '../controllers/movieController.js';
const router = express.Router();
router.use(express.json());

router.post('/',createMovie);

router.get('/all',getAllMovies);

router.get('/few',getFewMovies);

router.get('/movieDetails/:name/:id',getMovieDetails);

export default router;