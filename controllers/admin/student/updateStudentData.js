const { studentService } = require("../../../services");

async function updateStudentData(req, res) {
  try {
    const userId = req.params.studentId;
    const updates = req.body;
    const student = req.file;
    const image = student;
    console.log("image: ", image);
    console.log("student: ", student);

    // Update student data and sync changes with the User model
    const updatedStudent = await studentService.updateStudentData(
      userId,
      updates,
      image
    );

    return res.status(200).json({
      message: "Student data updated successfully",
      updatedStudent,
      success: true,
    });
  } catch (err) {
    console.error("Error updating student data:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
}

module.exports = updateStudentData;
