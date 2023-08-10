const Team = require('../../../models/Team')

async function getTeamList(req, res){
    try {
        const team = await Team.find().select('firstName lastName email profilePhoto')
        if(!team){
            return res.status(404).json({message: "Users Not Found"})
        }
        return res.status(200).json({success: true, team})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = getTeamList