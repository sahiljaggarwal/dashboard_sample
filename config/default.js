const dotenv = require("dotenv");
dotenv.config();

const config = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 6000,
  MONGODB_URL: process.env.mongoDb,
  secretKey: process.env.secretKey,
  gmail: process.env.gmail,
  gmailPassword: process.env.gmailPassword,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
};
module.exports = config;
