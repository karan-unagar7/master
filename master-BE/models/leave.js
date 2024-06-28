const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const { user } = require("./user.js");
const Joi = require("joi");
const { userLeave } = require("./userLeave.js");
const leave = sequelize.define(
  "leave",
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.ENUM("FirstHalf", "SecondHalf", "FullDay"),
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "tbl_leave",
    timestamps: true,
    hooks: {
      beforeValidate: function (leave) {
        for (const key in leave.dataValues) {
          if (typeof leave[key] === "string") {
            leave[key] = leave[key].toLowerCase();
          }
        }
      },
    },
  }
);

function validateDataForLeave(datas) {
  const schema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    leaveType: Joi.string()
      .valid("FirstHalf", "SecondHalf", "FullDay")
      .required(),
    reason: Joi.string().required(),
    requestId: Joi.number().integer().required(),
    status: Joi.string()
      .valid("Pending", "Approved", "Rejected")
      .default("Pending"),
  });
  return schema.validate(datas);
}

leave.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "userDetail",
});

leave.belongsTo(user, {
  foreignKey: "requestId",
  onDelete: "CASCADE",
  as: "requestedTo",
});

leave.belongsTo(userLeave, {
  foreignKey: "userId",
  targetKey: "userId",
  onDelete: "CASCADE",
  as: "leaveReport",
});

module.exports = { leave, validateDataForLeave };
