const Team = require('../../../models/Team')

async function searchTeamMember(req, res){
    console.log("search Team Member Controller is running.....")
    try {
        const query = req.query.query
        const teamMember = await Team.find({
            $or: [
                {firstName:{$regex: query, $options: 'i'}},
                {lastName:{$regex: query, $options: 'i'}},
                {email:{$regex: query, $options: 'i'}},
                {workRole:{$regex: query, $options: 'i'}},
                {city:{$regex: query, $options: 'i'}},
            ]
        })
        if(!teamMember || teamMember.length==0){
            return res.status(404).json({message: "Member Not found"})
        }
        return res.status(200).json({success:true, teamMember})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error[Search Error]", success:false})
    }
}

module.exports = searchTeamMember

