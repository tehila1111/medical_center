const express = require('express');
const router = express.Router();
const roomsTableController = require('../controllers/RoomsTableController');

// Routes for RoomsTable
router.get('/',roomsTableController.getAllRoomsTable);
router.post('/',roomsTableController.createRoomsTable);
router.get('/:id',roomsTableController.getRoomsTableById);
router.put('/:id', roomsTableController.updateRoomsTable);
router.delete('/:id', roomsTableController.deleteRoomsTable);

module.exports = router;
