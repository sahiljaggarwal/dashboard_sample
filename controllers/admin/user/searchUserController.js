const User = require('../../../models/User')

async function searchUser(req, res){
    try {
        const query = req.query.query
        const user = await User.find({
            $or: [

                {name:{$regex: query, $options: 'i'}},
                {email:{$regex: query, $options: 'i'}},

            ]
        })
        if(!user || user==0){
            return res.status(404).json({message: "User Not found"})
        }
        return res.status(200).json({success:true, user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error[User Search Error]", success:false})
    }
}

module.exports = searchUser