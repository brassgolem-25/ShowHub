import express from 'express';
import {MovieController} from '../controllers/movieController.js';
const router = express.Router();
router.use(express.json());

router.post('/addMovie',MovieController.createMovie);

router.get('/',MovieController.getAllMovies);

router.get('/few',MovieController.getFewMovies);

router.get('/movieDetails/:name/:id',MovieController.getMovieDetails);

router.get('/getAutoSuggestion',MovieController.getAutoSuggestion)

router.get('/fetchLatestMovies',MovieController.fetchLatestMovies);

router.get('/indexOpenSearch',MovieController.indexOpenSearch);

router.post('/addCustomerReview',MovieController.addCustomerReview);

router.post('/search',MovieController.getSearchSuggestion)

router.post('/searchMovies',MovieController.searchMovies);

export default router;