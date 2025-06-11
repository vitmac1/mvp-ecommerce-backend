const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Product",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            image: DataTypes.STRING,
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "product",
            timestamps: true,
        }
    );
};
