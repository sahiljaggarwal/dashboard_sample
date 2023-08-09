const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const verifyToken = require("../middlewares/verifyToken")
const checkRole = require('../middlewares/checkRole')

router.post('/register', authController.registerUser);
router.post('/resend-verification', authController.resendVerificationEmail);
router.post('/verify-email', authController.verifyEmail);

 // For All Users
router.post('/login', authController.loginUser);
router.post('/logout', verifyToken, authController.logoutUser)

// For HR & Admin Only
router.post('/change-password', verifyToken, checkRole('admin'),authController.changePassword)
router.post('/forgot-password',checkRole('admin'),authController.sendForgotPasswordOTP);
router.post('/reset-password',checkRole('admin') ,authController.resetPasswordWithOTP);

module.exports = router;