import Theater from "../models/theatre.js";
import Showtime from "../models/showTimes.js";
import Movie from "../models/movie.js";

// Create a new Theater entry
export const createShowtime = async (req, res) => {
    const { imdbID, theatreID, date, timings } = req.body;

    try {
      const movieExists = await Movie.findOne({imdbID});
      const theaterExists = await Theater.findOne({theatreID});
  
      if (!movieExists) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      if (!theaterExists) {
        return res.status(404).json({ message: 'Theater not found' });
      }
  
      const showtime = new Showtime({ imdbID, theatreID, date, timings });
      const savedShowtime = await showtime.save();
      res.status(201).json(savedShowtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get all Theaters
export const getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find({},{_id:0,__v:0});
        res.status(200).json(showtimes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

