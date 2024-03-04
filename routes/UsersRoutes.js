const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');

// Routes for Users
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser); // Assuming PUT for updating
router.delete('/:id', usersController.deleteUser);
router.get('/', usersController.getAllUsers);
router.post('/login', usersController.loginUser);

module.exports = router;
