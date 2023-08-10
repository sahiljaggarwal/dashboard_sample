const User = require('../../../models/User')

async function deleteUserById(req, res) {
    try {
      const userId  = req.params.userId;
      const user = await User.findByIdAndRemove(userId)
      if(!user){
        return res.status(404).json({message: "User Not Found"})
      }
      return res.status(200).json({ message: 'User deleted successfully.' , success:true});
    } catch (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Internal server error', success:false });
    }
  }

module.exports = deleteUserById