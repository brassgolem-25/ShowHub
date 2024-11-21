import Theater from "../models/theatre.js";
import Showtime from "../models/showTimes.js";
import Movie from "../models/movie.js";

// Create a new Theater entry
export const createShowtime = async (req, res) => {
  const { imdbID, theatreID, date, showtimes } = req.body;

  try {
    const movieExists = await Movie.findOne({ imdbID });
    const theaterExists = await Theater.findOne({ theatreID });

    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    if (!theaterExists) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    const showtime = new Showtime({ imdbID, theatreID, date, showtimes });
    const savedShowtime = await showtime.save();
    res.status(201).json(savedShowtime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Theaters
export const getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find({}, { _id: 0, __v: 0 });
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getShowTimeDetails = async (req, res) => {
  try {
    const { imdbID, theatreID, date } = req.body;
    console.log(req.body)
    const showTime = await Showtime.find({ imdbID: imdbID, theatreID: theatreID, date: date },{showtimes:1,_id:0});
    const result = {
      theatreID:theatreID,
      showtimes: showTime[0]?.showtimes || []
    }
    return res.status(200).json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
