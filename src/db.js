const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: "telegram_translate",
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  dialect: process.env.DB_DIALECT,
  host: "127.0.0.1",
  logging: false,
});

const userModel = require("./models/user.model")(db);

(async function () {
  try {
    await db.authenticate();
    console.log("db connected.");
  } catch (error) {
    throw error;
  }
})();

module.exports = { db, userModel };
