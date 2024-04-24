const mongoose = require('mongoose');

const ExamRequestSchema = new mongoose.Schema({
    requestID: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    acceptDate: {
        type: Date
    }
    
});

const ExamRequest = mongoose.model('ExamReques', ExamRequestSchema);

module.exports = ExamRequest;