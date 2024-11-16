import express from 'express';
import {getAllMovies,getFewMovies,createMovie, addCustomerReview,getMovieDetails} from '../controllers/movieController.js';
const router = express.Router();
router.use(express.json());

router.post('/',createMovie);

router.get('/all',getAllMovies);

router.get('/few',getFewMovies);

router.get('/movieDetails/:name/:id',getMovieDetails);

router.post('/addCustomerReview',addCustomerReview);

export default router;