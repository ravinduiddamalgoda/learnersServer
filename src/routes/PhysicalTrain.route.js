const express = require('express');
const PhysicalTrainCtrl = require('../controller/PhysicalTraining.ctrl');
const PhysicalTrainRouter = express.Router();

PhysicalTrainRouter.post('/add', PhysicalTrainCtrl.addPTS);
PhysicalTrainRouter.get('/:id', PhysicalTrainCtrl.getPTS);
PhysicalTrainRouter.get('/', PhysicalTrainCtrl.getAllPTS);
PhysicalTrainRouter.put('/:id', PhysicalTrainCtrl.updatePTS);
PhysicalTrainRouter.delete('/:id', PhysicalTrainCtrl.deletePTS);
PhysicalTrainRouter.get('/instructor/:id', PhysicalTrainCtrl.getPTSByInstructor);
PhysicalTrainRouter.get('/vehicle/:id', PhysicalTrainCtrl.getPTSByVehicle);

module.exports = PhysicalTrainRouter;


