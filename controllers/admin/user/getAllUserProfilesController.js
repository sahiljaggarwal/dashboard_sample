const User = require('../../../models/User')

async function getAllUserProfiles(req, res) {
  try {
    const user = await User.find()
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({user, success:true});
  } catch (err) {
    console.error('Error fetching user profiles:', err);
    return res.status(500).json({ error: 'Internal server error', success:false });
  }
}

module.exports = getAllUserProfiles;