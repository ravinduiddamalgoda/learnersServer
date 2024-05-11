const mongoose = require('mongoose');

const QuizMarksSchema = new mongoose.Schema({
    quizPackageID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

const QuizMarks = mongoose.model('QuizMarks', QuizMarksSchema);

module.exports = QuizMarks;