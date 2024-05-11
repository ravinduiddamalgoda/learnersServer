const ExamRequest = require("../models/ExamRequest");

// Create a new exam request
const createExamRequest = async (data) => {
    try {
        const examRequest = new ExamRequest(data);
        await examRequest.save();
        return examRequest;
    } catch (error) {
        throw error;
    }
}

// Retrieve exam requests
const getExamRequests = async () => {
    try {
        const examRequests = await ExamRequest.find();
        return examRequests;
    } catch (error) {
        throw error;
    }
}

// Update an exam request
const updateExamRequest = async (id, newData) => {
    try {
        const updatedExamRequest = await ExamRequest.findByIdAndUpdate(id, newData, { new: true });
        return updatedExamRequest;
    } catch (error) {
        throw error;
    }
}

// Delete an exam request
const deleteExamRequest = async (id) => {
    try {
        const deletedExamRequest = await ExamRequest.findByIdAndDelete(id);
        return deletedExamRequest;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createExamRequest,
    getExamRequests,
    updateExamRequest,
    deleteExamRequest
};
