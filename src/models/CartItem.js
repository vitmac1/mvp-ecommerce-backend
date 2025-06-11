const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "CartItem",
        {
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "cart_item",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["userId", "productId"],
                },
            ],
        }
    );
};
