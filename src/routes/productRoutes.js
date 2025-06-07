const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { adminMiddleware } = require('../middleware/auth');

// Rota pública: cadastro
router.post('/createProduct', productController.createProduct);

// Rotas protegidas
router.get('/getAllProducts', adminMiddleware, productController.getAllProducts);
router.get('/getAllProductsByQuery/:query', adminMiddleware, productController.getProductsByQuery);
router.get('/getProductById/:id', adminMiddleware, productController.getProductById);
router.put('/updateProduct/:id', adminMiddleware, productController.updateProduct);
router.delete('/deleteUserById/:id', adminMiddleware, userController.deleteUserById);

module.exports = router;
