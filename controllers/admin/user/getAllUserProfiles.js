const {userService} = require('../../../services/');

// Get All User Information && And Specific User Role Information
async function getAllUserProfiles(req, res) {
  try {
    const selectedRole = req.query.role;
    const users = await userService.getAllUserProfiles(selectedRole);
    const response ={
      success: true,
      data: users
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching user profiles:', err);
    return res.status(500).json({ error: 'Internal server error', success:false });
  }
}

module.exports = getAllUserProfiles;