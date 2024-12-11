import Theater from "../models/theatre.js";
import Showtime from "../models/showTimes.js";
import Movie from "../models/movie.js"
import { startOfWeek, endOfWeek, format } from 'date-fns';



export class ShowTimeController {
  // Get showTime for a movie
  static getShowTimeDetails = async (req, res) => {
    try {
      const { imdbID, city, date } = req.query;
      const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`;
      if (!imdbID || !city) {
        return res.status(500).json({ message: 'Parameters Missing' });
      }
      const theaterDetails = (await Theater.find({ 'location.city': city }, { location: 1, name: 1, theaterID: 1, _id: 0 }));
      const movieDetails = (await Movie.findOne({ imdbID }, { _id: 0, title: 1, genre: 1, language: 1 }))
      let showTime_Theater_Details = [];
      for (let theater of theaterDetails) {
        const showTimeSearchQuery = { theaterID: theater.theaterID, imdbID, date: formattedDate };
        const showTime = await Showtime.find(showTimeSearchQuery, { format:1,time:1,price:1,availableSeats:1, _id: 0});
        const showTimeForTheater = {
          showTime,
          theater_name: theater.name,
          theater_location: theater.location,
          theater_amenities: "M-Ticket,Food & Beverages",
          cancellationAvailable: true
        }

        showTime_Theater_Details.push(showTimeForTheater)
      }


      return res.status(200).json({ status: "success", result: { movieDetails: movieDetails, theater_showtime: showTime_Theater_Details } });
      // return res.status(200).json({status:"ok"})
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "false", error: error.message });
    }
  }

  static getFormattedDate() {
    const currentDate = new Date();

    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });

    // Format dates as YYYYMMDD
    const startDate = format(startOfWeekDate, 'yyyy-MM-dd');
    const endDate = format(endOfWeekDate, 'yyyy-MM-dd');

    return { startDate, endDate }
  }
}