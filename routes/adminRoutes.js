const express = require("express");
const router = express.Router();
const { adminController } = require("../controllers/index");
const searchTeamMember = require("../controllers/admin/team/searchTeamMemberController");
const verifyToken = require("../middlewares/verifyToken");
const checkRole = require("../middlewares/checkRole");
// const uploadProfilePhoto = require("../middlewares/multerMiddleware");
const upload = require("../middlewares/multerMiddleware");
const multer = require("multer");

// console.log(adminController.searchTeamMember)
// console.log("routes code ")
/*** ADMIN USER ROUTES ***/

// Get All User Data
/**
 * @swagger
 * /admin/user/all:
 *   get:
 *     summary: Get all user profiles (admin)
 *     description: Retrieve all user profiles for admin users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of user profiles.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  "/user/all",
  verifyToken,
  checkRole("admin"),
  adminController.getAllUserProfiles
);
// router.get('/user/all',adminController.getAllUserProfiles)

// Get  User Data By Id
/**
 * @swagger
 * /admin/user/{userId}:
 *   get:
 *     summary: Get user profile by ID (admin)
 *     description: Retrieve a user profile by ID for admin users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with the user profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

router.get(
  "/user/:userId",
  verifyToken,
  checkRole("admin"),
  adminController.getUserById
);

// Delete User
/**
 * @swagger
 * /admin/user/{userId}:
 *   delete:
 *     summary: Delete user by ID (admin)
 *     description: Delete a user by ID for admin users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     responses:
 *       200:
 *         description: Successful response indicating the user has been deleted.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete(
  "/user/:userId",
  verifyToken,
  checkRole("admin"),
  adminController.deleteUserById
);

// Create User
/**
 * @swagger
 * /admin/user/add:
 *   post:
 *     summary: Create a user (admin)
 *     description: Create a user profile for admin users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       201:
 *         description: Successful response indicating the user has been created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  "/user/add",
  verifyToken,
  checkRole("admin"),
  adminController.createUser
);

// Update User
/**
 * @swagger
 * /admin/user/{userId}:
 *   put:
 *     summary: Update user by ID (admin)
 *     description: Update a user profile by ID for admin users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Successful response indicating the user has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put(
  "/user/:userId",
  verifyToken,
  checkRole("admin"),
  adminController.updateUser
);

// Search User
/**
 * @swagger
 * /admin/user:
 *   get:
 *     summary: Search for users (admin)
 *     description: Search for user profiles for admin users based on query parameters.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Search query to filter users.
 *     responses:
 *       200:
 *         description: Successful response with a list of user profiles matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  "/user",
  verifyToken,
  checkRole("admin"),
  adminController.searchUser
);

/*** ADMIN STUDENT ROUTES ***/

// Add Student Data

router.post(
  "/student/add",
  verifyToken,
  checkRole("admin"),
  adminController.addStudentData
);

// Update Student Data
router.put(
  "/student/:studentId",
  verifyToken,
  checkRole("admin"),
  // uploadProfilePhoto,
  adminController.updateStudentData
);

// Delete Student Data
router.delete(
  "/student/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.deleteStudentData
);

// Get All Student Data
router.get(
  "/student/all",
  verifyToken,
  checkRole("admin"),
  adminController.getAllStudentsData
);

// Get Student By Id
router.get(
  "/student/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.getStudentDataById
);

// Search Student
router.get(
  "/student",
  verifyToken,
  checkRole("admin"),
  adminController.searchStudent
);

// Get Student Profile Thumbnail
router.get(
  "/student/thumbnail/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.getRoundThumbnail
);

// Get Student Full Image
router.get(
  "/student/image/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.getFullImage
);

/*** ADMIN PORTFOLIO ROUTES ***/

// Add Portfolio
router.post(
  "/portfolio/add",
  verifyToken,
  checkRole("admin"),
  adminController.addPortfolioController
);

// Get All Portfolios
router.get(
  "/portfolio/all",
  verifyToken,
  checkRole("admin"),
  adminController.getPortfoliosController
);

// Get Portfolios
router.get(
  "/portfolio/:portfolioId",
  verifyToken,
  checkRole("admin"),
  adminController.getPortfolioByIdController
);

// Delete Portfolio
router.delete(
  "/portfolio/:portfolioId",
  verifyToken,
  checkRole("admin"),
  adminController.deletePortfolioController
);

// Update Portfolio
router.put(
  "/portfolio/:portfolioId",
  verifyToken,
  checkRole("admin"),
  adminController.updatePortfolioController
);

// Search Portfolio
router.get(
  "/portfolio",
  verifyToken,
  checkRole("admin"),
  adminController.searchPortfolio
);

/*** ADMIN TEAM ROUTES ***/

// Add Team Member
router.post(
  "/team/add",
  verifyToken,
  checkRole("admin"),
  adminController.addTeamMember
);

// Get Team List
router.get(
  "/team/all",
  verifyToken,
  checkRole("admin"),
  adminController.getTeamList
);

// Get Team Member Details
router.get(
  "/team/:teamMemberId",
  verifyToken,
  checkRole("admin"),
  adminController.getTeamMemberById
);

// Delete Team member
router.delete(
  "/team/:teamMemberId",
  verifyToken,
  checkRole("admin"),
  adminController.deleteTeamMember
);

// Update Team Member
router.put(
  "/team/:teamMemberId",
  verifyToken,
  checkRole("admin"),
  adminController.updateTeamMember
);

// Search Team Member
router.get(
  "/team",
  verifyToken,
  checkRole("admin"),
  adminController.searchTeamMember
);

/*** Courses Routes ***/

// Add Course
router.post(
  "/course/add",
  upload.single("course"),
  verifyToken,
  checkRole("admin"),
  adminController.addCourse
);

// Get All Courses List
router.get(
  "/course/all",
  verifyToken,
  checkRole("admin"),
  adminController.getAllCourse
);

// Get Course List By Id
router.get(
  "/course/:courseId",
  verifyToken,
  checkRole("admin"),
  adminController.getCourseById
);

// Update Course
router.put(
  "/course/:courseId",
  verifyToken,
  checkRole("admin"),
  adminController.updateCourse
);

// Delete Course
router.delete(
  "/course/:courseId",
  verifyToken,
  checkRole("admin"),
  adminController.deleteCourse
);

module.exports = router;
