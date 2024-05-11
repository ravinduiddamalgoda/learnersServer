const express = require("expree")
const ExamRoute = express.Router();
const { createExamRequest, getExamRequests, updateExamRequest, deleteExamRequest } = require("../controller/ExamRequestController")

ExamRoute.post ("/addrequest", createExamRequest);
ExamRoute.put ("/:id", updateExamRequest);
ExamRoute.get ("/", getExamRequests);
ExamRoute.delete ("/:id", deleteExamRequest);
