import express from 'express';
import {getAllMovies,getFewMovies,fetchLatestMovies,createMovie, addCustomerReview,getMovieDetails,getAutoSuggestion,getSearchSuggestion,indexOpenSearch,searchMovies} from '../controllers/movieController.js';
const router = express.Router();
router.use(express.json());

router.post('/addMovie',createMovie);

router.get('/',getAllMovies);

router.get('/few',getFewMovies);

router.get('/movieDetails/:name/:id',getMovieDetails);

router.get('/getAutoSuggestion',getAutoSuggestion)

router.get('/fetchLatestMovies',fetchLatestMovies);

router.get('/indexOpenSearch',indexOpenSearch);

router.post('/addCustomerReview',addCustomerReview);

router.post('/search',getSearchSuggestion)

router.post('/searchMovies',searchMovies);

export default router;