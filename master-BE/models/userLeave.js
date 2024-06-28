const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const { user } = require("./user.js");
const Joi = require("joi");

const userLeave = sequelize.define(
  "userLeave",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalLeave: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableLeave: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    usedLeave: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalWorkingDays: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendancePercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_userLeave",
  }
);

function validateData(datas) {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    totalLeave: Joi.number().integer().required(),
    availbleLeave: Joi.number().integer().required(),
    usedLeave: Joi.number().integer().required(),
    totalWorkingDays: Joi.number().integer().required(),
    academicYear: Joi.string().required(),
    attendancePercentage: Joi.number().required(),
  });
  return schema.validate(datas);
}

userLeave.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = { userLeave, validateData };
