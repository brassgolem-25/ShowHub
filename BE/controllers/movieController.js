import Movie from "../models/movie.js";
import { redisClient } from "../config/redis.js";
import axios from "axios";
import { configDotenv } from 'dotenv';
import { client } from '../config/opensearch.js';

configDotenv();

export class MovieController {
  //imdbID Arr 
  static imdbArr = [];

  // Create a new movie entry
  static createMovie = async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      return res.status(201).json(movie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get all movies
  static getAllMovies = async (req, res) => {
    try {
      const movies = await Movie.find({}, { _id: 0, __v: 0 }).sort({ year: -1, released: -1 });
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get movie details
  static getMovieDetails = async (req, res) => {
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

      return res.json(movie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get few movies
  static getFewMovies = async (req, res) => {
    try {
      let movieArr = [];
      if (this.imdbArr.length === 0) {
        this.imdbArr = await Movie.find({}, { imdbID: 1, _id: 0 }).sort({ year: -1, released: -1 }).limit(10);
      }
      for (let obj of this.imdbArr) {
        const imdbID = obj['imdbID'];
        const redisResponse = await redisClient.hGet(imdbID, 'movieData');
        if (redisResponse) {
          movieArr.push(JSON.parse(redisResponse));
        } else {
          const movie = await Movie.findOne({ imdbID }, { __v: 0, _id: 0 });
          movieArr.push(movie);
          await redisClient.hSet(imdbID, 'movieData', JSON.stringify(movie));
        }
      }
      return res.json(movieArr);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  };

  // Add customer review
  static addCustomerReview = async (req, res) => {
    try {
      const { imdbID, customerReview } = req.body;
      const movie = await Movie.findOne({ imdbID });
      if (movie) {
        await Movie.updateOne({ imdbID }, { $push: { customerReview } });
        return res.json({ success: true, message: "Review Added" });
      } else {
        return res.status(404).json({ message: "Movie not found. Can't Update!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get auto suggestions
  static getAutoSuggestion = async (req, res) => {
    try {
      let movieArr = [];
      for (let obj of this.imdbArr) {
        const imdbID = obj['imdbID'];
        const redisResponse = await redisClient.hGet(imdbID, 'movieData');
        if (redisResponse) {
          movieArr.push(JSON.parse(redisResponse));
        }
      }
      return res.json(movieArr);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  };

  // Get search suggestions
  static getSearchSuggestion = async (req, res) => {
    try {
      const searchQuery = req.query['q'].toLowerCase();
      console.log(searchQuery);
      return res.json("hi");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Fetch latest movies from OMDB
  static fetchLatestMovies = async (req, res) => {
    try {
      const apiKey = process.env.OMDB_API_KEY;
      const page = req.query['page'];
      const year = req.query['year'];
      const url = `http://www.omdbapi.com/?s=movie&y=${year}&type=movie&page=${page}&apikey=${apiKey}`;
      const response = await axios.get(url);
      if (response.data && response.data.Search) {
        const imdbIDArr = response.data.Search.map(movie => movie.imdbID);
        for (let imdbID of imdbIDArr) {
          const movieRes = (await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)).data;
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

          const existingMovie = await Movie.findOne({ imdbID: movieRes.imdbID });
          if (!existingMovie) {
            const newMovie = new Movie(movieData);
            await newMovie.save();
          } else {
            console.log(`Movie with IMDb ID ${movieRes.imdbID} already exists.`);
          }
        }
      }
      return res.json({ status: "ok" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Search movies using OpenSearch
  static searchMovies = async (req, res) => {
    try {
      const searchArr = [];
      const { searchText } = req.body;
      const searchQuery = `${searchText.toLowerCase()}*`;
      const movieResponse = await client.search({
        index: "movies",
        body: {
          query: {
            wildcard: {
              title: {
                value: searchQuery
              }
            }
          }
        }
      });

      const movieArr = movieResponse.body.hits.hits;
      for (let movie of movieArr) {
        const searchData = {
          imdbID: movie._source.imdbID,
          title: movie._source.title
        };
        searchArr.push(searchData);
      }
      return res.json(searchArr);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Index movies into OpenSearch
  static indexOpenSearch = async (req, res) => {
    try {
      const moviesArr = await Movie.find({}, { title: 1, year: 1, director: 1, language: 1, imdbID: 1, _id: 0 }).sort({ year: -1, released: -1 });
      const bulkOperations = moviesArr.flatMap(movie => [
        { index: { _index: "movies" } },
        movie
      ]);
      const response = await client.bulk({ refresh: true, body: bulkOperations });
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}


