import Theater from "../models/theatre.js";
import Movie from "../models/movie.js";

export class TheaterController {
  // Get all Theaters
  static getAllTheaters = async (req, res) => {
    try {
      const theaters = await Theater.find({}, { _id: 0, __v: 0 });
      return res.json(theaters);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get Theaters for a specific movie in a specific location
  static getTheatreForMovie = async (req, res) => {
    try {
      const { imdbID, location } = req.body;

      // Validate IMDb ID and find the associated movie
      const movie = await Movie.findOne({ imdbID }, { _id: 1 });
      if (!movie) {
        return res.status(400).json({ message: "Invalid IMDb ID" });
      }

      const movieObjId = movie['_id'];

      // Fetch theaters showing the movie in the given location
      const theaters = await Theater.find(
        { 
          currentMovies: movieObjId, 
          'location.city': location 
        }, 
        { _id: 0, __v: 0 }
      );

      if (theaters.length === 0) {
        return res.status(404).json({ message: "No theaters found for this movie in the specified location" });
      }

      return res.json(theaters);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getCurrentlyRunningMovieByLocation = async(req,res) =>{
    try {
      const {city} = req.body;
      const runningMoviesByLocation = await Theater.find({'location.city':city});
      res.json(runningMoviesByLocation);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

