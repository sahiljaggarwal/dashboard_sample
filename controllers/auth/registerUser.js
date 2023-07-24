const authService = require('../../services/authService');

async function registerUser(req, res) {
    const { name, email, password, role } = req.body;
  
    try {
      const user = await authService.registerUser(name, email, password, role);
      console.log("account create successfully")
      res.status(201).json({ user });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = registerUser