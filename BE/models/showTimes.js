import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    imdbID: { 
      type: String, 
      required: true 
    },  // Movie's IMDb ID, required
    theatreID: { 
      type: String, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },  // Show date, required
    timings: [
      {
        time: { 
          type: String, 
          required: true 
        },  // Show time (e.g., "7:15 PM"), required
        format: { 
          type: String, 
          required: true 
        },  // e.g., '2D', '3D', 'IMAX', required
        availability: { 
          type: Number, 
          default: 100 
        }  // Seats available, default based on theater/screen capacity
      }
    ]
  });
  
  // Ensure a unique constraint on imdbID, theatreID, and date combined

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;