const authService = require('../../services/authService');
async function resendVerificationEmail(req, res) {
    const { email } = req.body;
  
    try {
      const result = await authService.resendVerificationEmail(email);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error resending verification email:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = resendVerificationEmail