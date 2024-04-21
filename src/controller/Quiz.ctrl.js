const QuizService = require('../service/Quiz.service');

const addQuiz = async (req, res) => {
    const { quiz, answer1, answer2, answer3, answer4, correctAnswer } = req.body;
    const newQuiz = await QuizService.addQuiz(quiz, answer1, answer2, answer3, answer4, correctAnswer);
    if (newQuiz) {
        res.status(201).json(newQuiz);
    } else {
        res.status(400).json({ message: "Failed to add the quiz" });
    }
}

const getQuiz = async (req, res) => {
    const id = req.params.id;
    const quiz = await QuizService.getQuiz(id);
    if (quiz) {
        res.status(200).json(quiz);
    } else {
        res.status(404).json({ message: "Quiz not found" });
    }
}

const getAllQuizes = async (req, res) => {
    const quizes = await QuizService.getAllQuizes();
    if (quizes) {
        res.status(200).json(quizes);
    } else {
        res.status(404).json({ message: "No quizes found" });
    }
}

const updateQuiz = async (req, res) => {
    const id = req.params.id;
    const { quiz, answer1, answer2, answer3, answer4, correctAnswer } = req.body;
    const updatedQuiz = await QuizService.updateQuiz(id, quiz, answer1, answer2, answer3, answer4, correctAnswer);
    if (updatedQuiz) {
        res.status(200).json(updatedQuiz);
    } else {
        res.status(400).json({ message: "Failed to update the quiz" });
    }
}

const deleteQuiz = async (req, res) => {
    const id = req.params.id;
    const deletedQuiz = await QuizService.deleteQuiz(id);
    if (deletedQuiz) {
        res.status(200).json({message : "Quiz deleted successfully"});
    } else {
        res.status(400).json({ message : "Failed to delete the quiz" });
    }
}

module.exports = {
    addQuiz,
    getQuiz,
    getAllQuizes,
    updateQuiz,
    deleteQuiz
}