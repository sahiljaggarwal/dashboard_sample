const userService = require('../../../services/');

async function createUser(req, res) {
    try {
      const { name, email, password, role, isVerified } = req.body;
  
      // Create a new user with isVerified set to true
      const user = await userService.createUser(name, email, password, role, isVerified);
  
      res.status(201).json({ message: "User Creadted Successfully", user });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = createUser;