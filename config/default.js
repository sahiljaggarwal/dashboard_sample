const dotenv = require( "dotenv");
dotenv.config()

const config = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 6000,
    MONGODB_URL: process.env.mongoDb,
    secretKey: process.env.secretKey,
    gmail: process.env.gmail,
    gmailPassword: process.env.gmailPassword
  };
module.exports =  config;