const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../middleware/auth');
const { 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    postLogin,
    postUser
} = require('../controllers/userController');

// Rota pública: cadastro
router.post('/registerUser', postUser);

// Rota pública: login
router.post('/login', postLogin);

// Rotas protegidas
router.get('/getAllUsers', adminMiddleware, getAllUsers);
router.get('/getUserById/:id', adminMiddleware, getUserById);
router.put('/updateUserById/:id', adminMiddleware, updateUserById);
router.delete('/deleteUserById/:id', adminMiddleware, deleteUserById);

module.exports = router;
