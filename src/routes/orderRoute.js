const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/createOrder', authMiddleware, orderController.createOrder);
router.get('/getOrders', authMiddleware, orderController.getOrders);
router.patch('/updateStatusOrder/:id', authMiddleware, orderController.updateStatus);

module.exports = router;