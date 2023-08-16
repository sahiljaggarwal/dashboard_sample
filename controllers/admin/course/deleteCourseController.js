const Course = require('../../../models/Course')

async function deleteCourse(req, res){
    try {
        const courseId = req.params.courseId
        const course = await Course.findByIdAndRemove(courseId)
        if(!course){
            return res.status(404).json({message: "Course Not Found"})
        }
        return res.status(200).json({message: "Course Deleted Successfully", success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success:false})
    }
}

module.exports = deleteCourse