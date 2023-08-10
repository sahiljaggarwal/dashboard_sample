const User = require('../../../models/User');

async function getUserById(req, res) {
  try {
    const userId  = req.params.userId
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message: "User Not Found"})
    }
    return res.status(200).json({user, success:true});
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch user', success:false });
  }
}

module.exports = getUserById;