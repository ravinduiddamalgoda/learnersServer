const mongoose = require('mongoose');


const quizPackageSchema = new mongoose.Schema({
    quizPackageID: {
        type: String,
        required: true,
        unique: true
    },
    quizPackage: {
        type: String,
        required: true
    },
    quizzes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    }]
});

const QuizPackage = mongoose.model('QuizPackage', quizPackageSchema);

module.exports = QuizPackage;
