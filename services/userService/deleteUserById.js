const User = require('../../models/User');
const bcrypt = require('bcrypt')


async function deleteUserById(userId) {
    try {
      // Find the user by ID and delete
      const result = await User.findByIdAndDelete(userId);
      if (!result) {
        throw new Error('User not found');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }

module.exports = deleteUserById;