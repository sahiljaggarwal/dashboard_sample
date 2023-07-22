const jwt = require('jsonwebtoken');
const config = require('../config/default');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    // req.userId = decoded.userId
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;