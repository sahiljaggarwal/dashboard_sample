const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function sendForgotPasswordOTP(email, userId) {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Generate the OTP and store it in the user's document
      const forgotPasswordOTP = generateOTP();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP will be valid for 5 minutes
  
      user.verificationOTP = forgotPasswordOTP;
      user.verificationExpiry = otpExpiry;
      await user.save();
  
      // Send the verification email with the OTP
      const purpose = "Forget Password"
      await sendVerificationEmail(email, forgotPasswordOTP, purpose);
  
      return { message: 'OTP sent successfully. Please check your email.' };
    } catch (err) {
      console.error('Error sending forgot password OTP:', err);
      throw err;
    }
  }

module.exports  = sendForgotPasswordOTP;