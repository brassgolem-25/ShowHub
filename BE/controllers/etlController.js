import Theater from "../models/theatre.js";
import Movie from "../models/movie.js";
import { postgreClient } from '../config/postgre.js';

export class ETLProcessController {

    constructor() { }

    loadTheater = async (req, res) => {
        try {
            const indianCities = (await postgreClient.query(`select name,state from indianCities`)).rows;
            const moviesArr = await Movie.find({}, { title: 1, year: 1, runtime: 1, genre: 1, language: 1, imdbID: 1, imdbRating: 1 ,_id:0}).sort({ year: -1, released: -1 });

            const theaterNames = ["PVR Cinemas", "INOX", "Cinepolis", "Carnival Cinemas", "Miraj Cinemas", "Nexus Cinemas", "Galaxy Multiplex", "Regal Theater", "Empire Multiplex", "Silver Screen Theater"];

            const theaterData = indianCities.map(data => ({
                name : theaterNames[Math.floor(Math.random()*10)],
                location : {
                    city : data.name,
                    state: data.state
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

}