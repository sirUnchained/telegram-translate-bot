require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "telegram_translate",
  host: "127.0.0.1",
  dialect: process.env.DB_DIALECT,
};
