const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminMiddleware } = require('../middleware/auth');

// Rota pública: cadastro
router.post('/register', userController.postUser);

// Rota pública: login
router.post('/login', userController.postLogin);

// Rotas protegidas
router.get('/', adminMiddleware, userController.getAllUsers);
router.get('/:id', adminMiddleware, userController.getUserById);
router.put('/:id', adminMiddleware, userController.updateUserById);
router.delete('/:id', adminMiddleware, userController.deleteUserById);

module.exports = router;
