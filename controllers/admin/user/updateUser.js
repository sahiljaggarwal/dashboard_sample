const {userService} = require('../../../services/');

async function updateUser(req, res) {
  try {
      const { userId } = req.params;
      const updates = req.body;
      const updatedUser = await userService.updateUser(userId, updates);
      return res.status(200).json({message: "user updated successfully",updatedUser, success: true});
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal server error' , success:false});
    }
  }

module.exports = updateUser