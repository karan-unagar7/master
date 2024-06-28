const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("../utility/config");

const generateToken = (payload) => {
  return jwt.sign(payload, SECRETKEY ,{expiresIn:'1d'});
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRETKEY);
};

module.exports = { generateToken, verifyToken };