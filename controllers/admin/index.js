const {createUser, deleteUserById, getAllUserProfiles, updateUser, getUserById, searchUser} = require('./user')
const {addStudentData, updateStudentData, getAllStudentsData, getStudentDataById, getRoundThumbnail, getFullImage, deleteStudentData, searchStudent} =  require('./student/')
const {addPortfolioController, getPortfoliosController, getPortfolioByIdController, deletePortfolioController, updatePortfolioController, searchPortfolio} = require('./portfolio')
const {addTeamMember,getTeamList, getTeamMemberById, deleteTeamMember, updateTeamMember, searchTeamMember} = require('./team')

module.exports = {
  // Users
  createUser,
  deleteUserById,
  getAllUserProfiles,
  updateUser,
  getUserById,
  searchUser,

  // Students
  addStudentData,
  updateStudentData,
  deleteStudentData,
  getAllStudentsData,
  getStudentDataById, 
  getRoundThumbnail,
  getFullImage,
  searchStudent,

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
  updateTeamMember,
  searchTeamMember,
  searchPortfolio
};