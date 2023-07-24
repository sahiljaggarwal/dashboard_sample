const authService = require('../../services/authService');

async function verifyEmail(req, res) {
    const { email, otp } = req.body;
  
    try {
      const result = await authService.verifyUser(email, otp);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error verifying email:', err);
      res.status(400).json({ error: err.message });
    }
  }

module.exports = verifyEmail