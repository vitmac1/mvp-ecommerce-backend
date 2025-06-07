const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const CartItem = sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.User);
    CartItem.belongsTo(models.Product);
  };

  module.exports = CartItem;