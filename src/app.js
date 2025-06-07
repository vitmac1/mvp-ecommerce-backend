const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const { buscarCep } = require('./utils/apiCep');
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

// Teste de rota
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT}');
});

// Exporta o app
module.exports = app;
