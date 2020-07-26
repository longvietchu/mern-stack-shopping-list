const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test connection
// sequelize
//     .authenticate()
//     .then(() => console.log("Connection has been established successfully."))
//     .catch((err) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
