const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers/index');
// const { getRoundThumbnail } = require('../controllers/admin/student');
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')
const uploadProfilePhoto = require('../middlewares/multerMiddleware');


// console.log(adminController.addPortfolioController)

/*** ADMIN USER ROUTES ***/

// Get All User Data
router.get('/user/all', verifyToken,checkRole('hr'),adminController.getAllUserProfiles)

// Get  User Data By Id
router.get('/user/:userId', verifyToken,checkRole('hr'),adminController.getUserById)

// Delete User
router.delete('/user/:userId', verifyToken, checkRole('hr'),adminController.deleteUserById)

// Create User
router.post('/user/add', verifyToken, checkRole('hr'),adminController.createUser);

// Update User
router.put('/user/:userId', verifyToken, checkRole('hr'), adminController.updateUser)


/*** ADMIN STUDENT ROUTES ***/

// Add Student Data
router.post('/student/add', verifyToken, checkRole('hr'),uploadProfilePhoto ,adminController.addStudentData);

// Update Student Data
router.put('/student/:studentId', verifyToken, checkRole('hr'),uploadProfilePhoto, adminController.updateStudentData);

// Delete Student Data
router.delete('/student/:studentId', verifyToken, checkRole('hr'), adminController.deleteStudentData)

// Get All User Data
router.get('/student/all', verifyToken,checkRole('hr'),adminController.getAllStudentsData)

// Get Student By Id
router.get('/student/:studentId', verifyToken,checkRole('hr'),adminController.getStudentDataById)

// Get Student Profile Thumbnail
router.get('/student/thumbnail/:studentId', verifyToken, checkRole('hr'), adminController.getRoundThumbnail);

// Get Student Full Image
router.get('/student/image/:studentId', verifyToken, checkRole('hr'), adminController.getFullImage)


/*** ADMIN PORTFOLIO ROUTES ***/

// Add Portfolio
router.post('/portfolio/add', verifyToken,checkRole('hr'), adminController.addPortfolioController)

// Get All Portfolios
router.get('/portfolio/all', verifyToken, checkRole('hr'),adminController.getPortfoliosController)

// Get Portfolios 
router.get('/portfolio/:portfolioId', verifyToken, checkRole('hr'), adminController.getPortfolioByIdController)

// Delete Portfolio
router.delete('/portfolio/:portfolioId', verifyToken, checkRole('hr'), adminController.deletePortfolioController)

// Update Portfolio
router.put('/portfolio/:portfolioId', verifyToken, checkRole('hr'), adminController.updatePortfolioController)


/*** ADMIN TEAM ROUTES ***/

// Add Team Member
router.post('/team/add', verifyToken, checkRole('hr'), adminController.addTeamMember)

// Get Team List
router.get('/team/all', verifyToken, checkRole('hr'), adminController.getTeamList)

// Get Team Member Details
router.get('/team/:teamMemberId', verifyToken, checkRole('hr'), adminController.getTeamMemberById)

// Delete Team member
router.delete('/team/:teamMemberId', verifyToken, checkRole('hr'), adminController.deleteTeamMember)

// Update Team Member
router.put('/team/:teamMemberId', verifyToken, checkRole('hr'), adminController.updateTeamMember)



module.exports = router;