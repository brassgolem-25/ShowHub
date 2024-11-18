import express from 'express';
import {getAllTheaters,createTheater,getTheatreForMovie} from '../controllers/theaterController.js'
const router = express.Router();
router.use(express.json());

router.post('/',createTheater);

router.get('/all',getAllTheaters);

router.post('/theatreDetails',getTheatreForMovie)
// router.get('/few',getFewMovies);

// router.get('/movieDetails/:name/:id',getMovieDetails);

export default router;