# mvp_ecommerce-backend

API RESTful em Node.js com Express para gerenciamento de usuários, produtos e pedidos, com autenticação via JWT.

## Tecnologias Utilizadas

- Node.js (v18+)
- Express.js
- PostgreSQL
- JWT para autenticação
- Bcrypt para hash de senhas
- Dotenv para variáveis de ambiente
- Middleware customizados para autenticação e autorização
- Sequelize com PostgreSQL

## Funcionalidades Principais

- Cadastro e login de usuários com geração de token JWT  
- Proteção de rotas via middleware de autenticação  
- Diferenciação de permissões entre usuários comuns e admins  
- Cadastro e listagem de produtos  
- Criação de pedidos com múltiplos produtos  
- Associação de pedidos ao usuário autenticado  
- Validações básicas e mensagens de erro/sucesso consistentes  

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js 16+ instalado  
- Postgres local ou remoto rodando  

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/vitmac1/mvp-ecommerce-backend.git
cd mvp-ecommerce-backend
```

2. Instale as dependências:

npm install

3. Configure a URL do banco e a chave JWT no .env

4. Inicie a aplicação:

npm start

5. Estrutura de Pastas

/src
/controllers     # Lógica das rotas (UserController, ProductController, etc.)
/routes          # Definições das rotas e middlewares
/models          # Schemas do PostgreSQL (User, Product, Order)
/middlewares     # Autenticação, validação e autorização
/config          # Conexão com o banco e configs globais
/utils           # Funções auxiliares
/server.js       # Arquivo principal de inicialização

Rotas Principais
O sistema possui as seguintes rotas configuradas, sendo que algumas exigem autenticação e outras exigem permissão de administrador:

/auth/register – Cadastro de usuário – Todos

/auth/login – Login de usuário – Todos

/users/me – Ver dados do usuário logado – Autenticado

/products (GET) – Lista de Produtos – Todos

/products (POST) – Cadastro de Produto – Somente admin

/orders (GET) – Meus Pedidos – Autenticado

/orders (POST) – Criar Pedido – Autenticado