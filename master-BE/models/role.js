const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");

const role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_role",
    indexes: [
      {
        unique: true,
        fields: ["name", "priority"],
      },
    ],
  }
);

module.exports = role;
