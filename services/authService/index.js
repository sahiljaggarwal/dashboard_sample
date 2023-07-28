const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const changePassword = require('./changePassword')
const resendVerificationEmail = require('./resendVerificationEmai')
const resetPasswordWithOTP = require('./resetPasswordWithOTP')
const verifyUser = require('./verifyUser')
const sendForgotPasswordOTP = require('./ sendForgotPasswordOTP')

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    changePassword,
    sendForgotPasswordOTP,
    resetPasswordWithOTP,
    resendVerificationEmail
}