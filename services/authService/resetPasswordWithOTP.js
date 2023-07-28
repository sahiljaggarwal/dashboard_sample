const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function resetPasswordWithOTP( otp, newPassword, userId) {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Check if the OTP is valid and not expired
      if (user.verificationOTP !== otp || user.verificationExpiry < Date.now()) {
        throw new Error('Invalid OTP or OTP has expired');
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the password with the new one and clear the OTP fields
      user.password = hashedPassword;
      user.verificationOTP = undefined;
      user.verificationExpiry= undefined;
      await user.save();
  
      return { message: 'Password reset successfully.' };
    } catch (err) {
      console.error('Error resetting password with OTP:', err);
      throw err;
    }
  }

module.exports = resetPasswordWithOTP;