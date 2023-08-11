const addStudentData = require('./addStudentData')
const updateStudentData = require('./updateStudentData')
const getAllStudentsData = require('./getAllStudentData')
const getStudentDataById = require('./getStudentDataById')
const getRoundThumbnail = require('./getRoundThumbnail')
const getFullImage = require('./getFullImage')
const deleteStudentData = require('./deleteStudentData')
const searchStudent = require('./searchStudentController')

module.exports = {
    addStudentData,
    updateStudentData,
    getAllStudentsData,
    getStudentDataById,
    getRoundThumbnail,
    getFullImage,
    deleteStudentData,
    searchStudent
}