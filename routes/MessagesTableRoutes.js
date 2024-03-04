const express = require('express');
const router = express.Router();
const messagesTableController = require('../controllers/MessagesController');

// Routes for RoomsTable
router.get('/',messagesTableController.getAllMessagesTable);
router.post('/',messagesTableController.createMessagesTable);
router.get('/:id',messagesTableController.getMessagesTableById);
router.put('/:id', messagesTableController.updateMessagesTable);
router.delete('/:id', messagesTableController.deleteMessagesTable);

module.exports = router;
