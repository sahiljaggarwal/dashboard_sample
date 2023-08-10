const Team = require('../../../models/Team')

async function getTeamMemberById(req, res){
    try {
        const teamMemberId = req.params.teamMemberId
        const teamMember = await Team.findById(teamMemberId)
        if(!teamMember){
            return res.status(200).json({message: "No team member is found"})
        }
        return res.status(200).json({success:true, teamMember})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = getTeamMemberById