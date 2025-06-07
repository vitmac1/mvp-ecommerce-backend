const app = require('./src/app');
const { sequelize } = require('./src/config/sequelize');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Conecta ao banco e inicia o servidor
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco bem-sucedida.');

    await sequelize.sync(); // Cria as tabelas se não existirem
    console.log('Tabelas sincronizadas.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
}

start();
