import express from 'express';
import {getAllMovies,getFewMovies,fetchLatestMovies,createMovie, addCustomerReview,getMovieDetails,getTrendingMoviesIDs,getAutoSuggestion,getSearchSuggestion} from '../controllers/movieController.js';
const router = express.Router();
router.use(express.json());

router.post('/',createMovie);

router.get('/all',getAllMovies);

router.post('/few',getFewMovies);

router.get('/movieDetails/:name/:id',getMovieDetails);

router.get('/getTrendingMoviesIDs',getTrendingMoviesIDs)

router.get('/getAutoSuggestion',getAutoSuggestion)

router.get('/fetchLatestMovies',fetchLatestMovies);

router.post('/addCustomerReview',addCustomerReview);

router.post('/search',getSearchSuggestion)


export default router;