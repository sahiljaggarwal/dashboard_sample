const Course = require('../../../models/Course')

async function updateCourse(req, res){
    try{
        const course = req.params.courseId
        const updatedData = req.body
        const result = await Course.findByIdAndUpdate(course, updatedData, {new: true}) 
        if(!result){
            return res.status(404).json({message: "Course Not Found"})
        }
        return res.status(200).json({message:"Course Updated Succes", success:true})
    } catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error", success:false})
    }
}

module.exports = updateCourse