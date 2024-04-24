const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;