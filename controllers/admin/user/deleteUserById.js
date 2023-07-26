const userService = require('../../../services/');

async function deleteUserById(req, res) {
    try {
      const { userId } = req.params;
      await userService.deleteUserById(userId);
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = deleteUserById