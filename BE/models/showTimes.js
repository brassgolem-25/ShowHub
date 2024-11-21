import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    imdbID: { 
      type: String, 
      required: true 
    },  
    theatreID: { 
      type: String, 
      required: true 
    },
    date: { 
      type: String, 
      required: true 
    },  
    showtimes: [
      {
        time: { 
          type: String, 
          required: true 
        },  
        format: { 
          type: String, 
          required: true 
        }, 
        availability: { 
          type: Number, 
          required : true
        }  
      }
    ]
  });
  
  // Ensure a unique constraint on imdbID, theatreID, and date combined

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;