const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {generateOTP, sendVerificationEmail} = require("./emailService")
const config = require('../config/default');

async function registerUser(name, email, password, role) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }
    // Check if any user with "admin" role exists
    const adminUser = await User.findOne({ role: 'admin' });
    if (role === 'admin' && adminUser) {
      throw new Error('An admin user already exists. Cannot create another admin user.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate the verification OTP
      const verificationOTP = generateOTP();

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verificationOTP,
      verificationExpiry: Date.now() + 3600000, // 1 Hour 
    });

    await user.save();
     // Send the verification email with OTP
     const purpose = "Email Varification"
     await sendVerificationEmail(email, verificationOTP, purpose);
    return user;
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
}

async function resendVerificationEmail(email) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a new verification OTP
    const verificationOTP = generateOTP();

    // Update the user's verification OTP and expiry
    user.verificationOTP = verificationOTP;
    user.verificationExpiry = Date.now() + 3600000; // 1 Hour
    await user.save();

    // Send the verification email with the new OTP
    const purpose = "Email Verification";
    await sendVerificationEmail(email, verificationOTP, purpose);
    
    return { message: 'Verification email sent successfully.' };
  } catch (err) {
    console.error('Error resending verification email:', err);
    throw err;
  }
}

async function verifyUser(email, otp){
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.verificationOTP === otp && user.verificationExpiry > Date.now()) {
      user.isVerified = true;
      user.verificationOTP = undefined;
      user.verificationExpiry = undefined;
      await user.save();

      return { message: 'Email verified successfully!' };
    } else {
      throw new Error('Invalid OTP or OTP has expired.');
    }
  } catch (err) {
    console.error('Error verifying email:', err);
    throw err;
  }
}

async function loginUser(email, password) {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

       // Check if the user is verified
       if (!user.isVerified) {
        throw new Error('User is not verified');
      }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token with user data (id, email, role)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      config.secretKey,
      { expiresIn: '24h' } // Token expires in 1 hour
    );

    return token;
  } catch (err) {
    console.error('Error during login:', err);
    throw err;
  }
}

async function changePassword(userId, oldPassword, newPassword) {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided old password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the new hashed password
    user.password = hashedNewPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  } catch (err) {
    console.error('Error changing password:', err);
    throw err;
  }
}

async function sendForgotPasswordOTP(email, userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Generate the OTP and store it in the user's document
    const forgotPasswordOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP will be valid for 5 minutes

    user.verificationOTP = forgotPasswordOTP;
    user.verificationExpiry = otpExpiry;
    await user.save();

    // Send the verification email with the OTP
    const purpose = "Forget Password"
    await sendVerificationEmail(email, forgotPasswordOTP, purpose);

    return { message: 'OTP sent successfully. Please check your email.' };
  } catch (err) {
    console.error('Error sending forgot password OTP:', err);
    throw err;
  }
}

async function resetPasswordWithOTP( otp, newPassword, userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the OTP is valid and not expired
    if (user.verificationOTP !== otp || user.verificationExpiry < Date.now()) {
      throw new Error('Invalid OTP or OTP has expired');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the password with the new one and clear the OTP fields
    user.password = hashedPassword;
    user.verificationOTP = undefined;
    user.verificationExpiry= undefined;
    await user.save();

    return { message: 'Password reset successfully.' };
  } catch (err) {
    console.error('Error resetting password with OTP:', err);
    throw err;
  }
}
module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  changePassword,
  sendForgotPasswordOTP,
  resetPasswordWithOTP,
  resendVerificationEmail
};
