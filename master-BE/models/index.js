const sequelize = require("../database/connection.js");
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`Tables Created`);
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = sequelize;
