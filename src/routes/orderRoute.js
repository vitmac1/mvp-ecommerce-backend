const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { createOrder, getOrders, updateStatus } = require('../controllers/orderController');

router.post('/createOrder', authMiddleware, createOrder);
router.get('/getOrders', authMiddleware, getOrders);
router.patch('/updateStatusOrder/:id', authMiddleware, updateStatus);

module.exports = router;