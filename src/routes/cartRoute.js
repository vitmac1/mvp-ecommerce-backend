const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { addToCart, getCartByUserId, removeFromCart} = require('../controllers/cartController');

router.post('/addToCart', authMiddleware, addToCart)
router.get('/getCartByUserId', authMiddleware, getCartByUserId)
router.delete('/deleteCart/:productId', authMiddleware, removeFromCart)

module.exports = router;