const InstructorSalaryController = require('../controller/InstructorSalary.ctrl');
const express = require('express');
const InstructorSalaryRouter = express.Router();

InstructorSalaryRouter.post('/add', InstructorSalaryController.addInstructorSalary);
InstructorSalaryRouter.get('/get/:InstructorID', InstructorSalaryController.getInstructorSalary);
InstructorSalaryRouter.get('/get', InstructorSalaryController.getAllInstructorSalary);

module.exports = InstructorSalaryRouter;