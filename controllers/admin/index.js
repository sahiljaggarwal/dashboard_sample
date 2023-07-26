const{createUser, deleteUserById, getAllUserProfiles, updateUser} = require('./user')
const {addStudentData, updateStudentData} =  require('./student/')

module.exports = {
  createUser,
  deleteUserById,
  getAllUserProfiles,
  updateUser,
  addStudentData,
  updateStudentData
};