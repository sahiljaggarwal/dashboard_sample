const express = require('express');
const router = express.Router();
const {studentController} = require('../controllers/index') 


const verifyToken = require("../middlewares/verifyToken")
const checkRole = require('../middlewares/checkRole');

// console.log(studentController);
/**
 * @swagger
 * /student/get-data:
 *   get:
 *     summary: Get student data
 *     description: Retrieve student data for the authenticated student user.
 *     tags:
 *       - Student
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with student data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentData'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/get-data', verifyToken, checkRole('student'), studentController.getStudentDataController)


router.get('/get-image', verifyToken, checkRole('student'), studentController.getFullImage) // no need 
router.get('/get-thumbnail', verifyToken, checkRole('student'), studentController.getRoundThumbnail)   // no need 

module.exports = router;

