const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers/index');
// const { getRoundThumbnail } = require('../controllers/admin/student');
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')
const uploadProfilePhoto = require('../middlewares/multerMiddleware');


console.log(adminController.addPortfolioController)

/*** ADMIN USER ROUTES ***/

// Get All User Data
router.get('/users', verifyToken,checkRole('admin'),adminController.getAllUserProfiles)

// Get  User Data By Id
router.get('/user/:userId', verifyToken,checkRole('admin'),adminController.getUserById)

// Delete User
router.delete('/delete-user/:userId', verifyToken, checkRole('admin'),adminController.deleteUserById)

// Create User
router.post('/add-user', verifyToken, checkRole('admin'),adminController.createUserController);

// Update User
router.put('/update-user/:userId', verifyToken, checkRole('admin'), adminController.updateUser)


/*** ADMIN STUDENT ROUTES ***/

// Add Student Data
router.post('/student/add-student', verifyToken, checkRole('admin'),uploadProfilePhoto ,adminController.addStudentData);

// Update Student Data
router.put('/student/update-student/:userId', verifyToken, checkRole('admin'),uploadProfilePhoto, adminController.updateStudentData);

// Get All User Data
router.get('/students', verifyToken,checkRole('admin'),adminController.getAllStudentsData)

// Get Student By Id
router.get('/student/:studentId', verifyToken,checkRole('admin'),adminController.getStudentDataById)

// Get Student Profile Thumbnail
router.get('/student/thumbnail/:userId', verifyToken, checkRole('admin'), adminController.getRoundThumbnail);

// Get Student Full Image
router.get('/student/image/:studentId', verifyToken, checkRole('admin'), adminController.getFullImage)

/*** ADMIN PORTFOLIO ROUTES ***/

// Add Portfolio
router.post('/portfolio/add', verifyToken,checkRole('admin'), adminController.addPortfolioController)

// Get All Portfolios
router.get('/portfolio/all', verifyToken, checkRole('admin'),adminController.getPortfoliosController)

// Get Portfolios 
router.get('/portfolio/:portfolioId', verifyToken, checkRole('admin'), adminController.getPortfolioByIdController)

// Delete Portfolio
router.delete('/portfolio/:portfolioId', verifyToken, checkRole('admin'), adminController.deletePortfolioController)

// Update Portfolio
router.put('/portfolio/:portfolioId', verifyToken, checkRole('admin'), adminController.updatePortfolioController)

module.exports = router;