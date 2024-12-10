import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
  theaterID: { type: String, required: true },
  imdbID: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }, 
  format: { type: String, required: true }, 
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: { type: [String], default: [] }, 
});

const Showtime = mongoose.model('Showtime', showtimeSchema);
export default Showtime;
