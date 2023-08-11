const Student = require('../../../models/Student')

async function searchStudent(req, res){
    try {
        const query = req.query.query
        const student = await Student.find({
            $or:[
                {firstName:{$regex: query, $options: 'i'}},
                {lastName:{$regex: query, $options: 'i'}},
                {email:{$regex: query, $options: 'i'}}
            ]
        })
        if(!student || student.length==0){
            return res.status(404).json({message: "Student not found"})
        }
        return res.status(200).json({success: true, student})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = searchStudent