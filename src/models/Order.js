const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Order = sequelize.define('Order', {
    total: DataTypes.DECIMAL(10,2),
    shippingCost: DataTypes.DECIMAL(10,2),
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pendente'
    },
    shippingAddress: DataTypes.STRING
});

Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderItem);
};

module.exports = Order;