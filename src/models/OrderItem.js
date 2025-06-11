const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "OrderItem",
        {
            quantity: DataTypes.INTEGER,
            unitPrice: DataTypes.DECIMAL(10, 2),
        },
        {
            tableName: "order_item",
            timestamps: true,
        }
    );
};
