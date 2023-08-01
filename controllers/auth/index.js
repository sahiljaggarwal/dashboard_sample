const changePassword = require("./changePassword")
const loginUser = require("./loginUser")
const registerUser = require('./registerUser')
const resendVerificationEmail = require('./resendVerificationEmail')
const resetPasswordWithOTP = require('./resetPasswordWithOTP')
const sendForgotPasswordOTP = require('./sendForgotPasswordOTP')
const verifyEmail = require('./verifyEmail')
const logoutUser = require('./logoutUser')


module.exports = {
    changePassword,
    loginUser,
    registerUser,
    resendVerificationEmail,
    resetPasswordWithOTP,
    sendForgotPasswordOTP,
    verifyEmail,
    sendForgotPasswordOTP,
    logoutUser
}