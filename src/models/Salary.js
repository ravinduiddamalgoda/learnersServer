const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    salaryID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    instructorID: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;