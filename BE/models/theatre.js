import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        address: String,
        city: String,
        state: String,
    },
    theatreID: {
        type: String,
        required: true,
        unique: true,
    },
    language: {
        type: String,
        required: true,
    },
    screens: [String],
    amenities: [String],
    contactDetails: {
        phone: String,
        email: String,
    },
    ratings: {
        average: Number,
        totalReviews: Number,
    },
    pricing: {
        basePrice: Number,
        premiumPrice: Number,
        currency: String,
    },
    seating: {
        totalSeats: Number,
    },
    operatingHours: {
        openingTime: String,
        closingTime: String,
    },
    currentMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movie',
        },
    ],
    socialMedia: {
        website: String,
        facebook: String,
        twitter: String,
        instagram: String,
    },
    policies: {
        cancellationPolicy: String,
        refundPolicy: String,
    },
    promotions: [
        {
            description: String,
            validUntil: Date,
        },
    ],
    accessibilityFeatures: [String],
    manager: {
        name: String,
        contact: String,
    },
});

const Theater = mongoose.model('theater', theaterSchema);

export default Theater;
