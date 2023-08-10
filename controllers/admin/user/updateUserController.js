const User = require('../../../models/User')

async function updateUser(req, res) {
  try {
      const userId = req.params.userId;
      const updates = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updates, {new: true})
      if(!updateUser){
        return res.status(404).json({message: "User Not Found"})
      }
      return res.status(200).json({message: "user updated successfully",updatedUser, success: true});
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal server error' , success:false});
    }
  }

module.exports = updateUser