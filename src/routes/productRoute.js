const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Rotas protegidas
router.get('/getAllProducts', authMiddleware, productController.getAllProducts);
router.get('/getAllProductsByQuery/:query', authMiddleware, productController.getProductsByQuery);
router.get('/getProductById/:id', authMiddleware, productController.getProductById);
router.post('/createProduct', adminMiddleware, productController.createProduct);
router.put('/updateProduct/:id', adminMiddleware, productController.updateProduct);
router.delete('/deleteUserById/:id', adminMiddleware, userController.deleteUserById);

module.exports = router;
