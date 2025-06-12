const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Order",
        {
            total: DataTypes.DECIMAL(10, 2),
            shippingCost: DataTypes.DECIMAL(10, 2),
            status: {
                type: DataTypes.STRING,
                defaultValue: "aprovado",
            },
            shippingAddress: DataTypes.STRING,
            paymentMethod: DataTypes.STRING,
        },
        {
            tableName: "order",
            timestamps: true,
        }
    );
};
