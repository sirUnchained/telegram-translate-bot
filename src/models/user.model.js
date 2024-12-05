const { DataTypes } = require("sequelize");

const userModel = (sequelize) => {
  const model = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      chatID: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  return model;
};

module.exports = userModel;
