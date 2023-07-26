const User = require('../../models/User');
const bcrypt = require('bcrypt')


async function getAllUserProfiles(selectedRole) {
    try {
      // Find all users and exclude the password field
      // const users = await User.find({}, { password: 0 });
  
      let query = {}; // Empty query to fetch all user profiles
  
      if (selectedRole && selectedRole !== 'all') {
        // If a specific role is selected and it's not 'all', add the role to the query
        query.role = selectedRole;
      }
  
      // Fetch user profiles based on the query
      const users = await User.find(query).select('-password -verificationOTP -verificationExpiry');
  
      return users;
    } catch (err) {
      console.error('Error fetching user profiles:', err);
      throw err;
    }
  }

module.exports = getAllUserProfiles;