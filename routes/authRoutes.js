const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const verifyToken = require("../middlewares/verifyToken")
const checkRole = require('../middlewares/checkRole')

// For Testing Purpose Only

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user [ testing purpose only ]
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               role:
 *                 type: string
 *                 enum: ['admin', 'hr', 'teacher', 'student']
 *                 description: User's role
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', authController.registerUser);
router.post('/resend-verification', authController.resendVerificationEmail); // No need
router.post('/verify-email', authController.verifyEmail); // No need

 // For All Users
 /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with credentials
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post('/login', authController.loginUser);
router.post('/logout', verifyToken, authController.logoutUser) // No need

// For HR & Admin Only
/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change user password (for HR and Admin)
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: User's current password
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.post('/change-password', verifyToken, checkRole('admin'),authController.changePassword)

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send a password reset OTP (for HR and Admin)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset OTP sent successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

router.post('/forgot-password',checkRole('admin'),authController.sendForgotPasswordOTP);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password with OTP (for HR and Admin)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               otp:
 *                 type: string
 *                 description: OTP received for password reset
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.post('/reset-password',checkRole('admin') ,authController.resetPasswordWithOTP);

module.exports = router;