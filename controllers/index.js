const authController = require('./auth');
const adminController = require('./admin');
// const studentController= require('./student/getStudentDataController')
const studentController= require('./student/')

module.exports = {
    authController,
    adminController,
    studentController
}