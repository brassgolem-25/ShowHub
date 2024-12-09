import Theater from "../models/theatre.js";
import ShowTime from "../models/showTimes.js"

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

  static getCurrentlyRunningMovieByLocation = async(req,res) =>{
    try {
      const {city} = req.query;
      const limit = parseInt(req.query.limit,10) || 0;

      const result =(await Theater.findOne({'location.city':city},{_id:0})).currentMoviesData;

      const runningMoviesByLocation  = limit ? result.slice(0,limit) : result;

      res.json(runningMoviesByLocation);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

