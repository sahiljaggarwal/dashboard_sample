const User = require('../../../models/User')

async function createUser(req, res) {
    try {
      const { name, email, password, role, isVerified } = req.body;
      const user = await new User({name, email, password, role, isVerified})
      await user.save()
      return res.status(201).json({ message: "User Creadted Successfully", user, success:true });
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal server error' , success:false});
    }
  }

module.exports = createUser;