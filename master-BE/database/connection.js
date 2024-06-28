const { Sequelize } = require("sequelize");
const {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
} = require("../utility/config");

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection Establised`);
  } catch (error) {
    console.log(`${error.message}`);
  }
})();

module.exports = sequelize;
