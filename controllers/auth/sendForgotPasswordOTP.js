const authService = require('../../services/authService');
async function sendForgotPasswordOTP(req, res) {
    const userId = req.user.id;
    const { email } = req.body;
  
    try {
      const result = await authService.sendForgotPasswordOTP(email, userId);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error sending forgot password OTP:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = sendForgotPasswordOTP