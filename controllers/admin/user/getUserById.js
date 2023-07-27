const { userService } = require('../../../services');

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

module.exports = getUserById;