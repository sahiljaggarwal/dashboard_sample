const authService = require('../../services/authService');

async function loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      const token = await authService.loginUser(email, password);
      console.log("login sucessfully")
      res.status(200).json({ message: "login successfully",token });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }

module.exports = loginUser