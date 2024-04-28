const express = require('express');
const EnrollPTSController = require('../controller/EnrollPTS.ctl');
const EnrollPTSRouter = express.Router();


EnrollPTSRouter.post('/add', EnrollPTSController.enrollPTS);
EnrollPTSRouter.get('/', EnrollPTSController.getAllEnrollPTS);
EnrollPTSRouter.delete('del/:id', EnrollPTSController.deleteByID);
EnrollPTSRouter.get('/:id', EnrollPTSController.getEnrollPTSBySessionID);
module.exports = EnrollPTSRouter;