function checkRole(role) {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        // User's role matches the required role, grant access
        return next();
      }
  
      // User's role doesn't match, deny access
      return res.status(403).json({ error: 'Unauthorized access.' });
    };
  }
  
module.exports = checkRole;