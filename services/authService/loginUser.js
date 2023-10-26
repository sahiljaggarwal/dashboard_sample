const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {generateOTP, sendVerificationEmail} = require("../emailService")
const config = require('../../config/default');

async function loginUser(email, password) {
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
  
         // Check if the user is verified
      if (!user.isVerified) {
        throw new Error('User is not verified');
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('user password: ', password)
      console.log('password match? : ', isPasswordValid)
      console.log('database password: ', user.password)
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
  
      // Generate JWT token with user data (id, email, role)
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        config.secretKey,
        { expiresIn: '24h' } // Token expires in 1 hour
      );
  
      return token;
    } catch (err) {
      console.error('Error during login:', err);
      throw err;
    }
  }


module.exports = loginUser;