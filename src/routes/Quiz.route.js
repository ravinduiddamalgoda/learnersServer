const express = require("express");
const QuizRoute = express.Router();
const QuizCtrl = require("../controller/Quiz.ctrl");

QuizRoute.post("/addQuiz", QuizCtrl.addQuiz);
QuizRoute.get("/getQuiz/:id", QuizCtrl.getQuiz);
QuizRoute.get("/getAllQuizes", QuizCtrl.getAllQuizes);
QuizRoute.put("/updateQuiz/:id", QuizCtrl.updateQuiz);
QuizRoute.delete("/deleteQuiz/:id", QuizCtrl.deleteQuiz);

module.exports = QuizRoute;
