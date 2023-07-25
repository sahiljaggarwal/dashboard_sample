const User = require('../models/User');
const bcrypt = require('bcrypt')

// Get All User Info With Specific Role
async function getAllUserProfiles(selectedRole) {
  try {
    // Find all users and exclude the password field
    // const users = await User.find({}, { password: 0 });

    let query = {}; // Empty query to fetch all user profiles

    if (selectedRole && selectedRole !== 'all') {
      // If a specific role is selected and it's not 'all', add the role to the query
      query.role = selectedRole;
    }

    // Fetch user profiles based on the query
    const users = await User.find(query).select('-password -verificationOTP -verificationExpiry');

    return users;
  } catch (err) {
    console.error('Error fetching user profiles:', err);
    throw err;
  }
}

// Delete User 
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

// Create User 
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

// Update User
async function updateUser(userId, updates) {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update user properties based on the updates object
    if (updates.name) {
      user.name = updates.name;
    }

    if (updates.email) {
      user.email = updates.email;
    }

    if (updates.role) {
      user.role = updates.role;
    }

    // Save the updated user
    await user.save();

    return user;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

module.exports = {
  getAllUserProfiles,
  deleteUserById,
  createUser,
  updateUser
};