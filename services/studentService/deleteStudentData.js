const Student = require('../../models/Student')

async function deleteStudentData(studentId){
    try {
        const student = await Student.findByIdAndRemove(studentId)
        if(!student){
            throw new Error("Student Not Found")
        }
        return {message: "Student Deleted Successfully"}
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error
    }
}

module.exports = deleteStudentData;