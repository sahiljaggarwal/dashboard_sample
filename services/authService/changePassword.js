const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function changePassword(userId, oldPassword, newPassword) {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Compare the provided old password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid old password');
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password with the new hashed password
      user.password = hashedNewPassword;
      await user.save();
  
      return { message: 'Password changed successfully' };
    } catch (err) {
      console.error('Error changing password:', err);
      throw err;
    }
  }

module.exports = changePassword;