const User = require('../../models/User');
const BlacklistedToken = require('../../models/BlacklistedToken');
  
async function logoutUser(userId, token) {
    try {
      // Add the token to the blacklist to invalidate it
      await BlacklistedToken.create({ token }); 
  
      // Your other logout logic goes here if needed
    // Fetch the user from the database based on userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Clear the user's token to log them out
    user.token = null;

    // Save the updated user object back to the database
    await user.save();

      return { message: 'Logout successful' };
    } catch (error) {
      throw error;
    }
  }
  

module.exports = logoutUser;
