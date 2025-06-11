const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Order",
        {
            total: DataTypes.DECIMAL(10, 2),
            shippingCost: DataTypes.DECIMAL(10, 2),
            status: {
                type: DataTypes.STRING,
                defaultValue: "pendente",
            },
            shippingAddress: DataTypes.STRING,
        },
        {
            tableName: "order",
            timestamps: true,
        }
    );
};
