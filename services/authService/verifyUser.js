const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function verifyUser(email, otp){
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      if (user.verificationOTP === otp && user.verificationExpiry > Date.now()) {
        user.isVerified = true;
        user.verificationOTP = undefined;
        user.verificationExpiry = undefined;
        await user.save();
  
        return { message: 'Email verified successfully!' };
      } else {
        throw new Error('Invalid OTP or OTP has expired.');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      throw err;
    }
  }

module.exports = verifyUser;