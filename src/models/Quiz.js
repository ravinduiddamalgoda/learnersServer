const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quiz: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: true
    },
    answer4: {
        type: String,
        required: true
    },
    answer5: {
        type: String,
        required: true

    },
    correctAnswer: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    

});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;