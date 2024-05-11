const QuizMarks = require('../models/QuizMarks');


const addQuizMarks = async (quizPackageID, userID, marks) => {
    const quizMarks = new QuizMarks({
        quizPackageID,
        userID,
        marks
    });
    return await quizMarks.save();
}

const getQuizMarks = async (quizPackageID, userID) => {
    return await QuizMarks.findOne({ quizPackageID, userID });
}

const getQuizMarksByUserID = async (userID) => {
    return await QuizMarks.find({ userID });
}

const getQuizMarksByQuizPackageID = async (quizPackageID) => {
    return await QuizMarks.find({ quizPackageID });
}

const updateQuizMarks = async (quizPackageID, userID, marks) => {
    return await QuizMarks.findOneAndUpdate({ quizPackageID, userID }, { marks },)
}

const deleteQuizMarks = async (quizPackageID, userID) => {
    return await QuizMarks.findOneAndDelete({ quizPackageID, userID });
}

const getAllQuizMarks = async () => {
    return await QuizMarks.find();
}


module.exports = {
    addQuizMarks,
    getQuizMarks,
    getQuizMarksByUserID,
    getQuizMarksByQuizPackageID,
    updateQuizMarks,
    deleteQuizMarks,
    getAllQuizMarks
}