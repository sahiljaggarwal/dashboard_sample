const Team = require('../../../models/Team')

async function addTeamMember(req, res){
    try{
        const { firstName, 
                lastName, 
                email, 
                workRole, 
                profilePhoto, 
                contactNo, 
                city, 
                experience,
                education, 
                address } = req.body

        const memberData = {
                firstName, 
                lastName, 
                email, 
                workRole, 
                profilePhoto, 
                contactNo, 
                city, 
                experience,
                education, 
                address
        }
        const savedMember = await new Team(memberData)
        await savedMember.save()
        return res.status(201).json({message:"Member Add Successfully", success:true, savedMember})
    } catch(error){
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success:false})
    }
}

module.exports = addTeamMember