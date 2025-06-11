const { CartItem, Product } = require("../models/models");

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const [item, created] = await CartItem.findOrCreate({
            where: { userId, productId },
            defaults: { quantity },
        });

        if (!created) {
            item.quantity += quantity;
            await item.save();
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
    }
};

const getCartByUserId = async (req, res) => {
    const userId = req.user.id;

    try {
        const items = await CartItem.findAll({
            where: { userId },
            include: [{ model: Product }],
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar carrinho " });
    }
};

const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    try {
        await CartItem.destroy({ where: { userId, productId } });
        res.json({ message: "Item removido com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao remover item" });
    }
};

module.exports = {
    addToCart,
    getCartByUserId,
    removeFromCart,
};
