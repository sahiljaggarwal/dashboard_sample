const {userService} = require('../../../services/');

async function deleteUserById(req, res) {
    try {
      const { userId } = req.params;
      await userService.deleteUserById(userId);
      return res.status(200).json({ message: 'User deleted successfully.' , success:true});
    } catch (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Internal server error', success:false });
    }
  }

module.exports = deleteUserById