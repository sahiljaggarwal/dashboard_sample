const User = require('../../models/User');
const Student = require('../../models/Student');
const bcrypt = require('bcrypt')


async function updateUser(userId, updates) {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
        // Store the original email before updating
        const originalEmail = user.email;


      // Update user properties based on the updates object
      if (updates.name) {
        user.name = updates.name;
      }
  
      if (updates.email) {
        user.email = updates.email;

        // Update the email in the Student model as well
        await Student.updateMany({ user: userId }, { $set: { email: updates.email } })
      }
  
      if (updates.role) {
        user.role = updates.role;
      }
      if (updates.password) {
        user.password = updates.password;
      }

      
      // Save the updated user
      await user.save();
  
      // If the email has been changed, return the original and updated emails
      if (originalEmail !== user.email) {
        return { originalEmail, updatedEmail: user.email };
    }

      return user;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }

module.exports = updateUser