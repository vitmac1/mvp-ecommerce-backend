const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    const userId = req.user.id;
    const { shippingAdress, shippingCost } = req.body;

    try {
        const cartItens = await CartItem.findAll({ where: { userId }, include: Product });

        if (!cartItens.length) return res.status(400).json({ error: 'Carrinho vazio' });

        const total = cartItens.reduce((acc, item) => acc + item.quantity * item.Product.price, 0);
        const order = await Order.create({ userId, total, shippingCost, shippingAdress });

        const orderItems = cartItens.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.Product.price
        }));

        await OrderItem.bulkCreate(orderItems);
        await CartItem.destroy({ where: { userId }});

        res.status(201).json({ order });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
}

const getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.findAll({ where: { userId }, include: OrderItem });
        res.json(orders);        
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);
        
        if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar status pedido' });
    }
}

module.exports = {
    createOrder,
    getOrders,
    updateStatus
}