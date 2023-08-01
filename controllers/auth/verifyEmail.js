const authService = require('../../services/authService');

async function verifyEmail(req, res) {
    const { email, otp } = req.body;
  
    try {
      const result = await authService.verifyUser(email, otp);
      const response ={
        success: true,
        data: result
      }
      return res.status(200).json(response);
    } catch (err) {
      console.error('Error verifying email:', err);
      return res.status(400).json({ error: err.message, success: false });
    }
  }

module.exports = verifyEmail