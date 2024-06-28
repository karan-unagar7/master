var dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DIALECT = process.env.DIALECT;
const CLOUDNAME = process.env.CLOUDNAME;
const CLOUDAPIKEY = process.env.APIKEY;
const CLOUDAPISECRET = process.env.APISECRET;
const SECRETKEY = process.env.SECRET_KEY;
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_ID_FB = process.env.CLIENT_ID_FB;
const CLIENT_SECRET_FB = process.env.CLIENT_SECRET_FB;

module.exports = {
  PORT,
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  CLOUDNAME,
  CLOUDAPIKEY,
  CLOUDAPISECRET,
  SECRETKEY,
  EMAIL,
  EMAIL_PASSWORD,
  CLIENT_ID,
  CLIENT_SECRET,
  CLIENT_URL,
  CLIENT_ID_FB,
  CLIENT_SECRET_FB,
};
