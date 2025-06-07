const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoute = require('./models/Product');

// Inicializa variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // para ler JSON no body das requisições

// Login
app.use('/user', userRoutes);

// Produto
app.use('/product', productRoute);

// Teste de rota
app.get('/', (req, res) => {
  res.send('API rodando!');
});

// Exporta o app
module.exports = app;
