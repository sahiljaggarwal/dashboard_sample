const authService = require('../../services/authService');

async function changePassword(req, res) {
    const userId = req.user.id
    const {  oldPassword, newPassword } = req.body;
  
    try {
      const result = await authService.changePassword(userId, oldPassword, newPassword);
      console.log("Password Changed Successfully")
      const response ={
        success: true,
        data: result
      }
      // res.status(200).json(result);
      return res.status(200).json(response);
    } catch (err) {
      console.error('Error changing password:', err);
      return res.status(400).json({ error: err.message, success:false });
    }
  }

module.exports = changePassword