const sequelize = require("../config/sequelize");

const User = require("./User");
const Product = require("./Product");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Inicializa os models (passando o sequelize para definição)
const user = User(sequelize);
const product = Product(sequelize);
const cartItem = CartItem(sequelize);
const order = Order(sequelize);
const orderItem = OrderItem(sequelize);

// Faz as associações explícitas
user.hasMany(cartItem, { foreignKey: "userId" });
user.hasMany(order, { foreignKey: "userId" });

cartItem.belongsTo(user, { foreignKey: "userId" });
cartItem.belongsTo(product, { foreignKey: "productId" });

product.hasMany(cartItem, { foreignKey: "productId" });
product.hasMany(orderItem, { foreignKey: "productId" });

order.belongsTo(user, { foreignKey: "userId" });
order.hasMany(orderItem, { foreignKey: "orderId" });

orderItem.belongsTo(order, { foreignKey: "orderId" });
orderItem.belongsTo(product, { foreignKey: "productId" });

module.exports = {
    sequelize,
    User: user,
    Product: product,
    CartItem: cartItem,
    Order: order,
    OrderItem: orderItem,
};
