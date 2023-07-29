const{createUserController, deleteUserById, getAllUserProfiles, updateUser, getUserById} = require('./user')
const {addStudentData, updateStudentData, getAllStudentsData, getStudentDataById, getRoundThumbnail, getFullImage} =  require('./student/')

module.exports = {
  createUserController,
  deleteUserById,
  getAllUserProfiles,
  updateUser,
  addStudentData,
  updateStudentData,
  getAllStudentsData,
  getStudentDataById, 
  getUserById,
  getRoundThumbnail,
  getFullImage
};