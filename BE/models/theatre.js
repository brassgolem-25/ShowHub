import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        city: { type: String, required: true },
        state: { type: String },
    },
    theaterID: {
        type: String,
        required: true,
        unique: true,
    },
    currentMoviesData: [
        {
            title: String,
            year: Number,
            runtime: String,
            genre: String,
            language: String,
            imdbID: String,
            imdbRating: String,
            poster:String
        },
    ]
});

const Theater = mongoose.model('theater', theaterSchema);

export default Theater;
