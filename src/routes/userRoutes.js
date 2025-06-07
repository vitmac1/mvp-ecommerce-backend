const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminMiddleware } = require('../middleware/auth');

// Rota pública: cadastro
router.post('/registerUser', userController.postUser);

// Rota pública: login
router.post('/login', userController.postLogin);

// Rotas protegidas
router.get('/getAllUsers/', adminMiddleware, userController.getAllUsers);
router.get('getUserById/:id', adminMiddleware, userController.getUserById);
router.put('/updateUserById/:id', adminMiddleware, userController.updateUserById);
router.delete('/deleteUserById/:id', adminMiddleware, userController.deleteUserById);

module.exports = router;
