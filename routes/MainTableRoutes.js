const express = require('express');
const router = express.Router();
const mainTableController = require('../controllers/MainTableController');

// Routes for MainTable
router.get('/', mainTableController.getAllMainTable);
router.get('/doctorQueue', mainTableController.getDoctorQueue)
router.get('/triageQueue', mainTableController.getTriageQueue)
router.get('/treatmentQueue', mainTableController.getTreatmentQueue)
router.get('/ecgQueue', mainTableController.getEcgQueue)
router.get('/receptionQueue', mainTableController.getReceptionQueue)

router.get('/getQueue/:id', mainTableController.getQueueByRoomId);

router.post('/', mainTableController.createMainTable);
router.put('/move', mainTableController.moveToOtherRoom);
router.put('/moveTop', mainTableController.moveTop);

router.get('/:id', mainTableController.getMainTableById);
router.put('/:id', mainTableController.updateMainTable);
router.delete('/:id', mainTableController.deleteMainTable);

module.exports = router;
