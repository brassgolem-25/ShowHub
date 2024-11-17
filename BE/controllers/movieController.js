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
    const movies = await Movie.find({}, { _id: 0, __v: 0 });
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get movie detail
export const getMovieDetails = async (req, res) => {
  try {
    const movieName = req.params.name;
    const imdbID = String(req.params.id);
    const movies = await Movie.find({ imdbID }, { _id: 0, __v: 0 });
    if (movies.length == 0) return res.json({ message: "No Movie Found with imdbID" });
    if (movies[0].title === movieName) {
      return res.json(movies);
    }
    return res.json({ message: "Incorrect MovieName" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//get few movies
export const getFewMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(5);
    return res.json(movies);
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
    }else {
      result = {message:"Movie not found.Can't Update!"};
    }

    return res.json({success:true,message:"Review Added"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}