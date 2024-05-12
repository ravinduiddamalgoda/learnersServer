const express = require('express');
const router = express.Router();
const reportController = require('../controller/PTSReportController');

router.get('/generate-report', reportController.generateReport);

module.exports = router;

