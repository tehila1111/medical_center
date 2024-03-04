const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

// Routes for ReportTable
router.post('/', reportController.createReportTable);
router.get('/:id', reportController.getReportById);
router.delete('/:id', reportController.deleteReport);
router.get('/', reportController.getAllReports); 
router.get('/', reportController.getReportsByDate);


module.exports = router;
