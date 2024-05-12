const QuizMarkService = require('../service/QuizMarks.service');
const UserServices = require('../service/User.service');
const emailSend = require('../service/SendEmail');
const addQuizMarks = async (req, res) => {
    try {
        const { quizPackageID, userID, marks } = req.body;
        const quizMarks = await QuizMarkService.addQuizMarks(quizPackageID, userID, marks);
        const userData = await UserServices.getUserProfile(userID);
        const email = userData.email;
        const subject = "Quiz Marks";
        const text = `You have scored ${marks} marks in the quiz`;
        emailSend.sendmail(email, subject, text);
        res.status(201).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQuizMarks = async (req, res) => {
    try {
        const { quizPackageID, userID } = req.params;
        const quizMarks = await QuizMarkService.getQuizMarks(quizPackageID, userID);
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQuizMarksByUserID = async (req, res) => {
    try {
        const { userID } = req.params;
        const quizMarks = await QuizMarkService.getQuizMarksByUserID(userID);
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQuizMarksByQuizPackageID = async (req, res) => {
    try {
        const { quizPackageID } = req.params;
        const quizMarks = await QuizMarkService.getQuizMarksByQuizPackageID(quizPackageID);
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateQuizMarks = async (req, res) => {
    try {
        const { quizPackageID, userID, marks } = req.body;
        const quizMarks = await QuizMarkService.updateQuizMarks(quizPackageID, userID, marks);
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const deleteQuizMarks = async (req, res) => {
    try {
        const { quizPackageID, userID } = req.params;
        const quizMarks = await QuizMarkService.deleteQuizMarks(quizPackageID, userID);
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllQuizMarks = async (req, res) => {
    try {
        const quizMarks = await QuizMarkService.getAllQuizMarks();
        res.status(200).json(quizMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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