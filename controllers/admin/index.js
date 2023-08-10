const {createUser, deleteUserById, getAllUserProfiles, updateUser, getUserById} = require('./user')
const {addStudentData, updateStudentData, getAllStudentsData, getStudentDataById, getRoundThumbnail, getFullImage, deleteStudentData} =  require('./student/')
const {addPortfolioController, getPortfoliosController, getPortfolioByIdController, deletePortfolioController, updatePortfolioController} = require('./portfolio')
const {addTeamMember,getTeamList, getTeamMemberById, deleteTeamMember, updateTeamMember} = require('./team')

module.exports = {
  // Users
  createUser,
  deleteUserById,
  getAllUserProfiles,
  updateUser,
  getUserById,

  // Students
  addStudentData,
  updateStudentData,
  deleteStudentData,
  getAllStudentsData,
  getStudentDataById, 
  getRoundThumbnail,
  getFullImage,

  // Portfolios
  addPortfolioController,
  getPortfoliosController,
  getPortfolioByIdController,
  deletePortfolioController,
  updatePortfolioController,

  // Team  
  addTeamMember,
  getTeamList,
  getTeamMemberById,
  deleteTeamMember,
  updateTeamMember
};