const Product = require('../models/Product');
const { Op } = require('sequelize');

// Criar produto
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const product = await Product.create({ name, description, price, image, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar produto', details: err.message });
  }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(201).json(products);
    } catch (err) {
        res.status(400).json({ error: 'Erro buscar produtos', details: err.message });
    }
}

const getProductsByQuery = async (req, res) => {
  try {
    const { id, name, description } = req.query;

    const where = {};

    if (id) {
      where.id = id;
    }
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (description) {
      where.description = { [Op.iLike]: `%${description}%` };
    }

    const products = await Product.findAll({ where });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar produtos', details: err.message });
  }
};

// Buscar um produto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Atualizar produto
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    Object.assign(product, { name, description, price, image, category });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar produto', details: err.message });
  }
};

// Deletar produto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    await product.destroy();
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByQuery,
  getProductById,
  updateProduct,
  deleteProduct
};
