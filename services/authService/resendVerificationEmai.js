const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function resendVerificationEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Generate a new verification OTP
      const verificationOTP = generateOTP();
  
      // Update the user's verification OTP and expiry
      user.verificationOTP = verificationOTP;
      user.verificationExpiry = Date.now() + 3600000; // 1 Hour
      await user.save();
  
      // Send the verification email with the new OTP
      const purpose = "Email Verification";
      await sendVerificationEmail(email, verificationOTP, purpose);
      
      return { message: 'Verification email sent successfully.' };
    } catch (err) {
      console.error('Error resending verification email:', err);
      throw err;
    }
  }

module.exports = resendVerificationEmail;