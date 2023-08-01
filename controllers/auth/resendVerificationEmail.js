const authService = require('../../services/authService');
async function resendVerificationEmail(req, res) {
    const { email } = req.body;
  
    try {
      const result = await authService.resendVerificationEmail(email);
      const response ={
        success: true,
        data: result
      }
      // res.status(200).json(result);
      return res.status(200).json(response);
    } catch (err) {
      console.error('Error resending verification email:', err);
      return res.status(500).json({ error: 'Internal server error' , success: false});
    }
  }

module.exports = resendVerificationEmail