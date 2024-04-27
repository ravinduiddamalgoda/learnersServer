const express = require('express');
const EnrollPTSController = require('../controller/EnrollPTS.ctl');
const EnrollPTSRouter = express.Router();


EnrollPTSRouter.post('/add', EnrollPTSController.enrollPTS);
EnrollPTSRouter.get('/', EnrollPTSController.getAllEnrollPTS);
EnrollPTSRouter.delete('del/st/:id', EnrollPTSController.deleteByStudentID);
EnrollPTSRouter.get('/:id', EnrollPTSController.getEnrollPTSBySessionID);
module.exports = EnrollPTSRouter;