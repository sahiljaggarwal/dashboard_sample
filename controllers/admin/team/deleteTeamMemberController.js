const Team = require('../../../models/Team')

async function deleteTeamMember(req, res){
    try {
        const teamMemberId = req.params.teamMemberId
        const teamMember = await Team.findByIdAndRemove(teamMemberId)
        if(!teamMember){
            return res.status(404).json({message: "Team Member Not Found"})
        }
        return res.status(200).json({success: true, message: "Team Member Deleted Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, error:"Internal Server Error"})
    }
}

module.exports = deleteTeamMember