const authService = require('../../services/authService');

async function loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      const token = await authService.loginUser(email, password);
      console.log("login sucessfully")
      return res.status(200).json({ message: "login successfully",token, success: true });
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(401).json({ error: 'Invalid credentials', success:false });
    }
  }

module.exports = loginUser