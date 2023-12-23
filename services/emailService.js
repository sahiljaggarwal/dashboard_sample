const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config = require("../config/default.js");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Set the email service provider (Gmail in this case)
  auth: {
    user: config.gmail, // Your email address
    pass: config.gmailPassword, // Your email account password or application-specific password
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendVerificationEmail = async (email, verificationOTP, purpose) => {
  try {
    const otp = verificationOTP;
    const mailOptions = {
      from: config.gmail,
      to: email,
      subject: `${purpose} OTP`,
      text: `Your OTP for ${purpose} is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return otp;
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};

module.exports = {
  sendVerificationEmail,
  generateOTP,
};
