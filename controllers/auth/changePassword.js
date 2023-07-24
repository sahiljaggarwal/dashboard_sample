const authService = require('../../services/authService');

async function changePassword(req, res) {
    const userId = req.user.id
    const {  oldPassword, newPassword } = req.body;
  
    try {
      const result = await authService.changePassword(userId, oldPassword, newPassword);
      console.log("Password Changed Successfully")
      res.status(200).json(result);
    } catch (err) {
      console.error('Error changing password:', err);
      res.status(400).json({ error: err.message });
    }
  }

module.exports = changePassword