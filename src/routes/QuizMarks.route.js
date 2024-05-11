const express = require('express');
const QuizMarksRouter = express.Router();
const QuizMarksController = require('../controller/QuizMarks.controller');

QuizMarksRouter.post('/add', QuizMarksController.addQuizMarks);
QuizMarksRouter.get('/get/:quizPackageID/:userID', QuizMarksController.getQuizMarks);
QuizMarksRouter.get('/get/:userID', QuizMarksController.getQuizMarksByUserID);
QuizMarksRouter.get('/get/:quizPackageID', QuizMarksController.getQuizMarksByQuizPackageID);
QuizMarksRouter.put('/update', QuizMarksController.updateQuizMarks);
QuizMarksRouter.delete('/delete/:quizPackageID/:userID', QuizMarksController.deleteQuizMarks);
QuizMarksRouter.get('/get', QuizMarksController.getAllQuizMarks);

module.exports = QuizMarksRouter;