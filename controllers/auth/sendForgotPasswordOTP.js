const authService = require('../../services/authService');
async function sendForgotPasswordOTP(req, res) {
    const userId = req.user.id;
    const { email } = req.body;
  
    try {
      const result = await authService.sendForgotPasswordOTP(email, userId);
      const response ={
        success: true,
        data: result
      }
      return res.status(200).json(response);
    } catch (err) {
      console.error('Error sending forgot password OTP:', err);
      return res.status(500).json({ error: 'Internal server error' , success:false});
    }
  }

module.exports = sendForgotPasswordOTP