const User = require('../../models/User');
const bcrypt = require('bcrypt')

async function createUser(name, email, password, role, isVerified) {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        isVerified,
      });
  
      await user.save();
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

module.exports = createUser