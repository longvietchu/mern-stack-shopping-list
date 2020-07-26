const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db-connection");

const Item = sequelize.define("Item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Item;
