const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OrderItem = sequelize.define('OrderItem', {
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL(10,2)
});

OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order);
    OrderItem.belongsTo(models.Product);
};

module.exports = OrderItem;