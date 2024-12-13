import Theater from "../models/theatre.js";
import Movie from "../models/movie.js";
import ShowTime from "../models/showTimes.js"
import { postgreClient } from '../config/postgre.js';

export class ETLProcessController {

    constructor() { }

    loadTheater = async (req, res) => {
        try {
            const indianCities = (await postgreClient.query(`select name,state from indianCities`)).rows;
            const moviesArr = await Movie.find({}, { title: 1, year: 1, runtime: 1, genre: 1, language: 1, imdbID: 1, imdbRating: 1,poster:1 ,_id:0}).sort({ year: -1, released: -1 });

            const theaterNames = ["PVR Cinemas", "INOX", "Cinepolis", "Carnival Cinemas", "Miraj Cinemas", "Nexus Cinemas", "Galaxy Multiplex", "Regal Theater", "Empire Multiplex", "Silver Screen Theater"];

            const theaterData = indianCities.map(data => ({
                name : theaterNames[Math.floor(Math.random()*10)],
                location : {
                    city : data.name.toLowerCase(),
                    state: data.state.toLowerCase()
                },
                theaterID: `Theater${Math.floor((Math.random()*10000))}`,
                currentMoviesData:moviesArr
            }))
            // console.log(theaterData)
            await Theater.insertMany(theaterData)
            res.json({status:"ok"})

        } catch (error) {
            console.log(error);
            res.json({status:"fail",error:error.message})
        }
    }

    loadShowtimes = async (req, res) => {
        try {
          // Fetch theaters and movies
          const theaters = await Theater.find({}, { theaterID: 1, currentMoviesData: 1, _id: 0 });
          const formats = ["2D", "3D", "IMAX"];
          const generateRandomTime = () => `${Math.floor(Math.random() * 12 + 1)}:${Math.random() > 0.5 ? "30" : "00"} ${Math.random() > 0.5 ? "AM" : "PM"}`;
          const generateRandomPrice = () => Math.floor(Math.random() * 200 + 100);
    
          const today = new Date();
          const showtimesData = [];
    
          for (const theater of theaters) {
            const { theaterID, currentMoviesData } = theater;
    
            for (const movie of currentMoviesData) {
              const { imdbID, language: movieLanguage } = movie;
    
              for (let day = 0; day < 10; day++) {
                const showDate = new Date(today);
                showDate.setDate(today.getDate() + day);
                const formattedDate = showDate.toISOString().split('T')[0];
                const dailyShowtimes = Math.floor(Math.random() * 3 + 3);
                const languageList = movieLanguage.split(', ');
                for(let language of languageList){
                for (let i = 0; i < dailyShowtimes; i++) {
                  showtimesData.push({
                    theaterID,
                    imdbID,
                    date: formattedDate,
                    time: generateRandomTime(),
                    format: formats[Math.floor(Math.random() * formats.length)],
                    language: language ,
                    price: generateRandomPrice(),
                    availableSeats: 50, // Fixed seat count for simplicity
                    bookedSeats: [],
                  });
                }
              }
              }
            }
          }
    
          // Insert showtime data into the collection
          await ShowTime.insertMany(showtimesData);
    
          res.json({ status: "ok", insertedCount: showtimesData.length,data:showtimesData.slice(0,1)});
        } catch (error) {
          console.error(error);
          res.json({ status: "fail", error: error.message });
        }
      };
}