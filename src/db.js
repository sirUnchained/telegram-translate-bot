const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "telegram_translate",
  password: "",
  username: "root",
  dialect: "mysql",
  host: "127.0.0.1",
});

(async function () {
  try {
    await db.authenticate();
    console.log("db connected.");
  } catch (error) {
    throw error;
  }
})();

module.exports = { db };
