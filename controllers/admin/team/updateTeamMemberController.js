const Team = require('../../../models/Team')

async function updateTeamMember(req, res){
    try {
        const teamMemberId = req.params.teamMemberId
        const teamMemberData = req.body
        const teamMember = await Team.findByIdAndUpdate(teamMemberId, teamMemberData, {new:true})
        if(!teamMember){
            return res.status(200).json({message: "Team Member Not Found"})
        }

        /*
        for(const field in teamMemberData){
            if(teamMemberData.hasOwnProperty(field)){
                teamMember[field] = teamMemberData[field]
            }
        }
        */
        return res.status(200).json({message: "Team Member Data Updated Successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", status:false})
    }
}

module.exports = updateTeamMember