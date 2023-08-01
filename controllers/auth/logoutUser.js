// const authService = require('../../services/');
const authService = require('../../services/authService');

async function logout(req, res) {
    try {
      const userId = req.user.id; // Assuming you have already verified the token and stored user data in req.userData
    //   const token = req.headers.authorization?.split(' ')[1]; // Get the token from the request header
      const token = req.header('Authorization').split(' ')[1];
      // Call the logoutUser service
      const user = await authService.logoutUser(userId, token);
  
      return res.status(200).json({ message: 'Logged out successfully', success:true });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ error: 'Internal server error', success:false });
    }
  }

module.exports = logout;
