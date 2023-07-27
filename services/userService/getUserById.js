const User = require('../../models/User');

async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports =  getUserById ;