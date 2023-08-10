const {addStudentData, upload} = require('./addStudentData')
const getStudentData = require('./getStudentData')
const updateStudentData = require('./updateStudentData')
const getAllStudentsData = require('./getAllStudentData')
const deleteStudentData = require('./deleteStudentData')

module.exports = {
    getStudentData,
    upload,
    addStudentData,
    updateStudentData,
    getAllStudentsData,
    deleteStudentData
}