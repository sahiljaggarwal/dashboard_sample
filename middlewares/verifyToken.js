const jwt = require('jsonwebtoken');
const config = require('../config/default');
const BlacklistedToken = require('../models/BlacklistedToken');


async function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
        // Check if the token exists in the blacklist
    const isBlacklisted = await BlacklistedToken.exists({ token });
    if (isBlacklisted) {
      return res.status(403).json({ error: 'Invalid token [Blacklist]' });
    }

    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    // req.userId = decoded.userId
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;