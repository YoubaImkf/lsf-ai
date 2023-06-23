const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// Authentication
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;