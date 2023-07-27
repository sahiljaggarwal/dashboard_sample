const {userService} = require('../../../services/');

async function updateUser(req, res) {
    const { userId } = req.params;
    const updates = req.body;
  
    try {
      const updatedUser = await userService.updateUser(userId, updates);
      res.status(200).json({message: "user updated successfully",updatedUser});
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = updateUser