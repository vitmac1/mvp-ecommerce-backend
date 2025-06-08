const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./src/routes/userRoute');
const productRoute = require('./src/routes/productRoute');
const cartRoute = require('./src/routes/cartRoute');
const orderRoute = require('./src/routes/orderRoute');
const { buscarCep } = require('./src/utils/apiCep');
const sequelize = require('./src/config/sequelize');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Inicializa variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // para ler JSON no body das requisições

// Login
app.use('/user', userRoute);

// Produto
app.use('/product', productRoute);

// Carrinho
app.use('/cart', cartRoute)

// Pedido
app.use('/order', orderRoute);

// Api CEP
app.get('/cep/:cep', buscarCep);

// Expomos a pasta de imagens para o front
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Teste de rota
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco bem-sucedida.');

        await sequelize.sync(); // Cria as tabelas se não existirem
        console.log('Tabelas sincronizadas.');

        console.log(`Servidor rodando em http://localhost:${PORT}`);
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
});

// Exporta o app
module.exports = app;
