const {studentService} = require('../../../services/')

async function deleteStudentData(req, res){
    try {
        const studentId = req.params.studentId
        const deletedStudent = await studentService.deleteStudentData(studentId)
        return res.status(200).json({message: deletedStudent.message, success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success:false})
    }
}

module.exports = deleteStudentData