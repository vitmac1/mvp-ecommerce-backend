const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cep: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "users",
            timestamps: true,
        }
    );
};
