const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
    createProduct,
    getAllProducts,
    getProductsByQuery,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { upload } = require('../utils/multerStorage');

// Rotas protegidas
router.get('/getAllProducts', authMiddleware, getAllProducts);
router.get('/getAllProductsByQuery/:query', authMiddleware, getProductsByQuery);
router.get('/getProductById/:id', authMiddleware, getProductById);
router.post('/createProduct', adminMiddleware, upload.single('image'), createProduct);
router.put('/updateProduct/:id', adminMiddleware, updateProduct);
router.delete('/deleteProduct/:id', adminMiddleware, deleteProduct);

module.exports = router;
