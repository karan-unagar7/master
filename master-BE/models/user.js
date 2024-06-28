const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const role = require("./role.js");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "tbl_user",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
    hooks: {
      beforeValidate: function (user) {
        for (const key in user.dataValues) {
          if (key === "password") continue; // it's for don't convert password value in lowercase
          if (typeof user[key] === "string") {
            user[key] = user[key].toLowerCase();
          }
        }
      },
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

function validateDataForUser(datas) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
    gender: Joi.string().valid("male", "female").required(),
    phone: Joi.string().length(10).required(),
    address: Joi.string().required(),
    department: Joi.string().required(),
    class: Joi.string().optional(),
  });
  return schema.validate(datas);
}

function validatePasswordForReset(datas) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
  });
  return schema.validate(datas);
}

user.belongsTo(role, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
});

user.prototype.checkPassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

module.exports = { user, validateDataForUser, validatePasswordForReset };
