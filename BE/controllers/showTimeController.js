import Theater from "../models/theatre.js";
import Showtime from "../models/showTimes.js";

export class ShowTimeController {
  // Get showTime for a movie
  static getShowTimeDetails = async (req, res) => {
    try {
      const { imdbID, date ,city} = req.query;
      if(!imdbID || !date || !city ){
        return res.status(500).json({message:'Parameters Missing'});
      }
      const theaterCode = (await Theater.findOne({'location.city':city},{theaterID:1,_id:0})).theaterID;
      const showTime = await Showtime.find({ imdbID: imdbID ,date: date }, { __v: 0, _id: 0 });
      return res.status(200).json(showTime);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}