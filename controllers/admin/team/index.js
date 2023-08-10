const addTeamMember = require('./addTeamMemberController')
const getTeamList = require('./getTeamListController')
const getTeamMemberById = require('./getTeamMemberByIdController')
const deleteTeamMember = require('./deleteTeamMemberController')
const updateTeamMember = require('./updateTeamMemberController')


module.exports = {
    addTeamMember,
    getTeamList,
    getTeamMemberById,
    deleteTeamMember,
    updateTeamMember
}