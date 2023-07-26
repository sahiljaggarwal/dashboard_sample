const User = require('../../models/User');
const bcrypt = require('bcrypt')


async function updateUser(userId, updates) {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Update user properties based on the updates object
      if (updates.name) {
        user.name = updates.name;
      }
  
      if (updates.email) {
        user.email = updates.email;
      }
  
      if (updates.role) {
        user.role = updates.role;
      }
  
      // Save the updated user
      await user.save();
  
      return user;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }

module.exports = updateUser