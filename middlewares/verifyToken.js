const jwt = require("jsonwebtoken");
const config = require("../config/default");
const BlacklistedToken = require("../models/BlacklistedToken");

async function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const bearerToken = token;
    tokenWithoutBearer = bearerToken.split(" ")[1];

    const decoded = jwt.verify(tokenWithoutBearer, config.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
