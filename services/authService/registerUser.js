const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function registerUser(name, email, password, role) {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }
      // Check if any user with "admin" role exists
      const adminUser = await User.findOne({ role: 'admin' });
      if (role === 'admin' && adminUser) {
        throw new Error('An admin user already exists. Cannot create another admin user.');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate the verification OTP
        const verificationOTP = generateOTP();
  
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        verificationOTP,
        verificationExpiry: Date.now() + 3600000, // 1 Hour 
      });
  
      await user.save();
       // Send the verification email with OTP
       const purpose = "Email Varification"
       await sendVerificationEmail(email, verificationOTP, purpose);
      return user;
    } catch (err) {
      console.error('Error registering user:', err);
      throw err;
    }
  }

module.exports = registerUser;