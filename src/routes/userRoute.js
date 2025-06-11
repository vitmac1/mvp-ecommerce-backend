const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
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
router.get('/getAllUsers', authMiddleware, adminMiddleware, getAllUsers);
router.get('/getUserById/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/updateUserById/:id', authMiddleware, adminMiddleware, updateUserById);
router.delete('/deleteUserById/:id', authMiddleware, adminMiddleware, deleteUserById);

module.exports = router;
