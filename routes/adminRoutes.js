const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers/index');
const searchTeamMember = require('../controllers/admin/team/searchTeamMemberController')
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')
const uploadProfilePhoto = require('../middlewares/multerMiddleware');


// console.log(adminController.searchTeamMember)
// console.log("routes code ")
/*** ADMIN USER ROUTES ***/

// Get All User Data
// router.get('/user/all', verifyToken,checkRole('admin'),adminController.getAllUserProfiles)
router.get('/user/all',adminController.getAllUserProfiles)

// Get  User Data By Id
router.get('/user/:userId', verifyToken,checkRole('admin'),adminController.getUserById)

// Delete User
router.delete('/user/:userId', verifyToken, checkRole('admin'),adminController.deleteUserById)

// Create User
router.post('/user/add', verifyToken, checkRole('admin'),adminController.createUser);

// Update User
router.put('/user/:userId', verifyToken, checkRole('admin'), adminController.updateUser)

// Search User
router.get('/user',verifyToken, checkRole('admin'), adminController.searchUser)


/*** ADMIN STUDENT ROUTES ***/

// Add Student Data
router.post('/student/add', verifyToken, checkRole('admin'),uploadProfilePhoto ,adminController.addStudentData);

// Update Student Data
router.put('/student/:studentId', verifyToken, checkRole('admin'),uploadProfilePhoto, adminController.updateStudentData);

// Delete Student Data
router.delete('/student/:studentId', verifyToken, checkRole('admin'), adminController.deleteStudentData)

// Get All User Data
router.get('/student/all', verifyToken,checkRole('admin'),adminController.getAllStudentsData)

// Get Student By Id
router.get('/student/:studentId', verifyToken,checkRole('admin'),adminController.getStudentDataById)

// Get Student Profile Thumbnail
router.get('/student/thumbnail/:studentId', verifyToken, checkRole('admin'), adminController.getRoundThumbnail);

// Get Student Full Image
router.get('/student/image/:studentId', verifyToken, checkRole('admin'), adminController.getFullImage)

// Search Student
router.get('/student', verifyToken, checkRole('admin'), adminController.searchStudent);

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

// Search Portfolio
router.get('/portfolio', verifyToken, checkRole('admin'), adminController.searchPortfolio)


/*** ADMIN TEAM ROUTES ***/

// Add Team Member
router.post('/team/add', verifyToken, checkRole('admin'), adminController.addTeamMember)

// Get Team List
router.get('/team/all', verifyToken, checkRole('admin'), adminController.getTeamList)

// Get Team Member Details
router.get('/team/:teamMemberId', verifyToken, checkRole('admin'), adminController.getTeamMemberById)

// Delete Team member
router.delete('/team/:teamMemberId', verifyToken, checkRole('admin'), adminController.deleteTeamMember)

// Update Team Member
router.put('/team/:teamMemberId', verifyToken, checkRole('admin'), adminController.updateTeamMember)

// Search Team Member
router.get('/team',verifyToken, checkRole('admin'),  adminController.searchTeamMember)

/*** Courses Routes ***/

// Add Course
router.post('/course/add', verifyToken, checkRole('admin'),adminController.addCourse)

// Get All Courses List
router.get('/course/all', verifyToken, checkRole('admin'), adminController.getAllCourse)

// Get Course List By Id
router.get('/course/:courseId', verifyToken, checkRole('admin'), adminController.getCourseById)

// Update Course
router.put('/course/:courseId', verifyToken, checkRole('admin'),adminController.updateCourse)

// Delete Course
router.delete('/course/:courseId',verifyToken,checkRole('admin'), adminController.deleteCourse)

module.exports = router;