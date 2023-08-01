const authService = require('../../services/authService');

async function registerUser(req, res) {
    const { name, email, password, role } = req.body;
  
    try {
      const user = await authService.registerUser(name, email, password, role);
      console.log("account create successfully")
      return res.status(201).json({ user, success: true });
    } catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal server error', success:false });
    }
  }

module.exports = registerUser