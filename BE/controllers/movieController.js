import Movie from "../models/movie.js";
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
    const movies = await Movie.find();
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get few movies
export const getFewMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(5);
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
