const authService = require('../services/authService');

async function registerUser(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const user = await authService.registerUser(name, email, password, role);
    console.log("account create successfully")
    res.status(201).json({ user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  try {
    const result = await authService.resendVerificationEmail(email);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error resending verification email:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function verifyEmail(req, res) {
  const { email, otp } = req.body;

  try {
    const result = await authService.verifyUser(email, otp);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    console.log("login sucessfully")
    res.status(200).json({ message: "login successfully",token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

async function changePassword(req, res) {
  const userId = req.user.id
  const {  oldPassword, newPassword } = req.body;

  try {
    const result = await authService.changePassword(userId, oldPassword, newPassword);
    console.log("Password Changed Successfully")
    res.status(200).json(result);
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(400).json({ error: err.message });
  }
}

async function sendForgotPasswordOTP(req, res) {
  const { email } = req.body;

  try {
    const result = await authService.sendForgotPasswordOTP(email);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error sending forgot password OTP:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function resetPasswordWithOTP(req, res) {
  const { email, otp, newPassword } = req.body;

  try {
    const result = await authService.resetPasswordWithOTP(email, otp, newPassword);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error resetting password with OTP:', err);
    res.status(400).json({ error: err.message });
  }
}
module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
  sendForgotPasswordOTP,
  resetPasswordWithOTP,
  resendVerificationEmail
};
