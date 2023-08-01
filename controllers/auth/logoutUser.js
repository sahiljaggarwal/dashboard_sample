// const authService = require('../../services/');
const authService = require('../../services/authService');

async function logout(req, res) {
    try {
      const userId = req.user.id; // Assuming you have already verified the token and stored user data in req.userData
    //   const token = req.headers.authorization?.split(' ')[1]; // Get the token from the request header
      const token = req.header('Authorization');
      // Call the logoutUser service
      const user = await authService.logoutUser(userId, token);
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = logout;
