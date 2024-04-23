const QuizPackageCtrl = require('../controller/QuizPackage.ctrl');
const express = require('express');
const QuizPackageRouter = express.Router();


QuizPackageRouter.post('/add', QuizPackageCtrl.addQuizPackage);
QuizPackageRouter.get('/:id', QuizPackageCtrl.getQuizPackage);
QuizPackageRouter.get('/', QuizPackageCtrl.getQuizPackages);
QuizPackageRouter.put('/:id', QuizPackageCtrl.updateQuizzes);
QuizPackageRouter.put('/package/:id', QuizPackageCtrl.updateQuizPackage);
QuizPackageRouter.delete('/:id', QuizPackageCtrl.deleteQuizPackage);

module.exports = QuizPackageRouter;
