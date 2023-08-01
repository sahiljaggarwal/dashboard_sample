const {userService }= require('../../../services/');
// const userService = require('../../../services/userService');


async function createUserController(req, res) {
    try {
      const { name, email, password, role, isVerified } = req.body;
  
      // Create a new user with isVerified set to true
      const user = await userService.createUser(name, email, password, role, isVerified);
  
      return res.status(201).json({ message: "User Creadted Successfully", user, success:true });
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal server error' , success:false});
    }
  }

module.exports = createUserController;