import Theater from "../models/theatre.js";
import Showtime from "../models/showTimes.js";
import Movie from "../models/movie.js"
import { startOfWeek, endOfWeek, format } from 'date-fns';



export class ShowTimeController {
  // Get showTime for a movie
  static getShowTimeDetails = async (req, res) => {
    try {
      const { imdbID ,city} = req.query;
      const {startDate,endDate} = this.getFormattedDate();
      if(!imdbID  || !city ){
        return res.status(500).json({message:'Parameters Missing'});
      }
      const theaterDetails = (await Theater.findOne({'location.city':city},{location:1,name:1,theaterID:1,_id:0}));
      const movieDetails = (await Movie.findOne({imdbID},{_id:0,title:1,genre:1}))
      const showTimeSearchQuery = {theaterID:theaterDetails.theaterID, imdbID: imdbID , date :{$gte:startDate,$lte:endDate} };
      const showTime = await Showtime.find(showTimeSearchQuery, { __v: 0, _id: 0 });
      const showTime_Theater_Details  = showTime.map(shows => {
        return {
          ...shows.toObject(),
          movie_name : movieDetails.title,
          movie_genre:movieDetails.genre,
          theater_name: theaterDetails.name,
          theater_location:theaterDetails.location,
          theater_amenities:"Free Parking,Lunch",
          cancellationAvailable:true
        }
      })

      console.log(showTime_Theater_Details.slice(0,1))
      return res.status(200).json(showTime_Theater_Details);
      // return res.status(200).json({status:"ok"})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getFormattedDate(){
    const currentDate = new Date();

    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); 
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });     
    
    // Format dates as YYYYMMDD
    const startDate = format(startOfWeekDate, 'yyyy-MM-dd');
    const endDate = format(endOfWeekDate, 'yyyy-MM-dd');

    return {startDate,endDate}
  }
}