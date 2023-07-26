const userService = require('../../../services/');

// Get All User Information && And Specific User Role Information
async function getAllUserProfiles(req, res) {
  try {
    const selectedRole = req.query.role;
    const users = await userService.getAllUserProfiles(selectedRole);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching user profiles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = getAllUserProfiles;