const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.post('/addToCart', authMiddleware, cartController.addToCart)
router.get('/getCartByUserId', authMiddleware, cartController.getCartByUserId)
router.delete('/deleteCart/:productId', authMiddleware, cartController.removeFromCart)

module.exports = router;