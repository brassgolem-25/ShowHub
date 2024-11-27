import Movie from "../models/movie.js";
import { redisClient } from "../config/redis.js";
import axios from "axios";
import { configDotenv } from 'dotenv';

configDotenv();
//
let imdbArr = [];

// Create a new movie entry
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({},{_id:0,__v:0}).sort({year:-1,released:-1});
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get movie detail
export const getMovieDetails = async (req, res) => {
  try {
    const movieName = req.params.name.toLowerCase(); // Normalize name comparison
    const imdbID = String(req.params.id);

    const redisResponse = await redisClient.hGet(imdbID, 'movieData');
    if (redisResponse) {
      const movieData = JSON.parse(redisResponse); // Parse Redis response
      if (movieData.title.toLowerCase() === movieName) {
        return res.json(movieData); // Return movie if name matches
      } else {
        return res.status(400).json({ message: "Incorrect Movie Name" });
      }
    }

    const movie = await Movie.findOne({ imdbID }, { _id: 0, __v: 0 });
    if (!movie) {
      return res.status(404).json({ message: "No Movie Found with imdbID" });
    }

    await redisClient.hSet(imdbID, 'movieData', JSON.stringify(movie));
    if (movie.title.toLowerCase() !== movieName) {
      return res.status(400).json({ message: "Incorrect Movie Name" });
    }

    // Return the movie data
    return res.json(movie);
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: error.message });
  }
};

//get few movies
export const getFewMovies = async (req, res) => {
  try {
    let movieArr = [];
    if (imdbArr.length === 0) {
      imdbArr = await Movie.find({}, { imdbID: 1, _id: 0 }).sort({ year: -1, released: -1 }).limit(10);
    }
    for (let obj of imdbArr) {
      const imdbID = obj['imdbID'];
      const redisResponse = await redisClient.hGet(imdbID, 'movieData');
      if (redisResponse) {
        movieArr.push(JSON.parse(redisResponse));
      }
      else {
        const movie = await Movie.findOne({ imdbID }, { __v: 0, _id: 0 });
        movieArr.push(movie);
        const redisRes = await redisClient.hSet(imdbID, 'movieData', JSON.stringify(movie));
        if (redisRes === 1) {
        }
      }
    }

    return res.json(movieArr);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//add customer review
export const addCustomerReview = async (req, res) => {
  try {
    const { imdbID, customerReview } = req.body;
    const movie = await Movie.findOne({ imdbID: imdbID });
    let result;
    if (movie) {
      result = await Movie.updateOne({ imdbID: imdbID }, { $push: { customerReview: customerReview } });
    } else {
      result = { message: "Movie not found.Can't Update!" };
    }

    return res.json({ success: true, message: "Review Added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


//get suggestion movie 
export const getAutoSuggestion = async (req, res) => {
  try {
    let movieArr = [];
    for (let obj of imdbArr) {
      const imdbID = obj['imdbID'];
      const redisResponse = await redisClient.hGet(imdbID, 'movieData');
      movieArr.push(JSON.parse(redisResponse));
    }
    return res.json(movieArr);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//get Search Suggestion 
export const getSearchSuggestion = async (req, res) => {
  try {
    const searchQuery = (req.query['q']).toLowerCase();
    // oc
    console.log(req.query['q']);
    return res.json("hi");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const fetchLatestMovies = async(req,res) =>{
  try{
    const apiKey = process.env.OMDB_API_KEY;
    const page = req.query['page'];
    const year = req.query['year']
    const url =  `http://www.omdbapi.com/?s=movie&y=${year}&type=movie&page=${page}&apikey=${apiKey}`;
    const response = (await axios.get(url));
    if(response.data && response.data.Search){
      const imdbIDArr = response.data.Search.map(movie => movie.imdbID);
      for (let imdbID of imdbIDArr) {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        const movieRes = (await axios.get(url)).data;
        const movieData = {
          title: movieRes.Title,
          year: movieRes.Year,
          released: movieRes.Released, 
          runtime: movieRes.Runtime,
          genre: movieRes.Genre,
          director: movieRes.Director,
          actors: movieRes.Actors,
          plot: movieRes.Plot,
          language: movieRes.Language,
          country: movieRes.Country,
          poster: movieRes.Poster,
          imdbRating: movieRes.imdbRating,
          imdbID: movieRes.imdbID,
          boxOffice: movieRes.BoxOffice,
          customerReview: [] 
        };
  
        const existingMovie = await Movie.findOne({ imdbID: movieRes.imdbID })
        if (!existingMovie) {
          const newMovie = new Movie(movieData);
          await newMovie.save();
        }else {
          console.log(`Movie with IMDb ID ${movieRes.imdbID} already exists.`);
        }
      }
    }
    res.json({"status":"ok"})
    // console.log(movieRes)
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}
