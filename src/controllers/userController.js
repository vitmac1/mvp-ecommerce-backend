const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');

// Autentica login de usuário
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await User.findOne({ where: { email } });

    if (!user)
        return res.status(401).json({ error: 'Usuário não encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
        return res.status(401).json({ error: 'Senha inválida' });

    // Gerar o token
    const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({ token });
    } catch (err) {
    res.status(500).json({ error: 'Erro no login', details: err.message });
    }
}

// Cria novo usuário
const postUser = async (req, res) => {
    try {
        const { email, password, cpf, address } = req.body;

        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
        email,
        password: hashedPassword,
        cpf,
        address,
        isAdmin: true
        });

        // Retorna o usuário sem a senha
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
}

// Buscar usuário por id
const getUserById = async (req, res) => {
    try {   
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

const updateUserById = async (req, res) => {
    try {
        const { email, cpf, address } = req.body;
        const user = await User.findByPk(req.params.id);
        
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        user.email = email || user.email;
        user.cpf = cpf || user.cpf;
        user.address = address || user.address;

        await user.save();

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json(userResponse);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar usuário', details: err.message });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        await user.destroy();
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
}

module.exports = {
    postLogin,
    postUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
