const { userService } = require('../../../services');

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    const response ={
      success: true,
      data: user
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch user', success:false });
  }
}

module.exports = getUserById;