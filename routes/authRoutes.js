const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/index');
const verifyToken = require("../middlewares/verifyToken")

router.post('/register', authController.registerUser);
router.post('/resend-verification', authController.resendVerificationEmail);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.loginUser);
router.post('/change-password', verifyToken, authController.changePassword)
router.post('/forgot-password',verifyToken,authController.sendForgotPasswordOTP);
router.post('/reset-password', verifyToken,authController.resetPasswordWithOTP);

module.exports = router;