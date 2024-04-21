const mongoose = require('mongoose');

const quizPackageSchema = new mongoose.Schema({
    quizPackageID : {
        type: String,
        required: true,
        unique: true
    },
    quizPackage: {
        type: String,
        required: true
    },
    quiz: {
        type: Array,
        required: true
    }
    
});