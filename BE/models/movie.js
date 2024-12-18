import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  imdbRating: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
    unique: true, // Ensures that each movie has a unique IMDb ID
  },
  boxOffice: {
    type: String,
    required: true,
  },
  customerReview: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      dateAdded :{type:Date,default: Date.now}
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
