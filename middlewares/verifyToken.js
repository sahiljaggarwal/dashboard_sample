const jwt = require('jsonwebtoken');
const config = require('../config/default');
const BlacklistedToken = require('../models/BlacklistedToken');


async function verifyToken(req, res, next) {
  
  try {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const bearerToken = token;
    tokenWithoutBearer = bearerToken.split(" ")[1];


        // Check if the token exists in the blacklist
    const isBlacklisted = await BlacklistedToken.exists({ token: tokenWithoutBearer });
    if (isBlacklisted) {
      return res.status(403).json({ error: 'Login Karo' });
    }

    const decoded = jwt.verify(tokenWithoutBearer, config.secretKey);
    req.user = decoded;
    // req.userId = decoded.userId
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;