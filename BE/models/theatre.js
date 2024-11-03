import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
    },
    location: {
        address: String,
        city: String,
        state: String,
    },
    theatreID : 
    {
        type: String,
        required: true,
        unique: true
    },
    screens: [String], // List of screen identifiers
    amenities: [String], // e.g., ['M-Ticket', 'Food & Beverage']
});


const Theater = mongoose.model('theater', theaterSchema);

export default Theater;