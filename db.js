const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "telegram_translate",
  password: "",
  username: "root",
  dialect: "mysql",
  host: "127.0.0.1",
});

module.exports = { db };
