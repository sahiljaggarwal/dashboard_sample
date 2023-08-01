const authService = require('../../services/authService');

async function resetPasswordWithOTP(req, res) {
    const userId = req.user.id;
    const {  otp, newPassword } = req.body;
  
    try {
      const result = await authService.resetPasswordWithOTP(userId, otp, newPassword);
      const response ={
        success: true,
        data: result
      }
      return res.status(200).json(response);
    } catch (err) {
      console.error('Error resetting password with OTP:', err, );
      res.status(400).json({ error: err.message, success:false});
    }
  }

module.exports = resetPasswordWithOTP