const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers/index');
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')

// Get All User Data
router.get('/users', verifyToken,checkRole('admin'),adminController.getAllUserProfiles)

// Delete User
router.delete('/delete-user/:userId', verifyToken, checkRole('admin'),adminController.deleteUserById)

// Create User
router.post('/create-user', verifyToken, checkRole('admin'),adminController.createUser);

// Update User
router.put('/update-user/:userId', verifyToken, checkRole('admin'), adminController.updateUser)

// Upload Student Data
router.post('/add-student-data', verifyToken, checkRole('admin'), adminController.addStudentData);

module.exports = router;