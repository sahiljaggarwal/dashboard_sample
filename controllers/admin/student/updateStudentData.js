const { studentService } = require("../../../services");
const Student = require("../../../models/Student");
const fs = require("fs");
async function updateStudentData(req, res) {
  try {
    const userId = req.params.studentId;
    const updates = req.body;
    const student = req.file;
    const image = student;
    console.log("image: ", image);
    console.log("student: ", student);

    const { email, contactNo } = updates;

    if (email) {
      const existingUser = await Student.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        try {
          const ImagePath = student.path;
          fs.unlinkSync(ImagePath);
          console.log("Student Image Deleted");
        } catch (error) {
          console.log("Student Image File Deletion Error:", error);
        }
        return res.status(200).json({
          message: "Email is already in use by another user",
          success: true,
        });
      }
    }

    if (contactNo) {
      const existingUser = await Student.findOne({
        contactNo,
        _id: { $ne: userId },
      });
      if (existingUser) {
        try {
          const ImagePath = student.path;
          fs.unlinkSync(ImagePath);
          console.log("Student Image Deleted");
        } catch (error) {
          console.log("Student Image File Deletion Error:", error);
        }
        return res.status(200).json({
          message: "Contact number is already in use by another user",
          success: true,
        });
      }
    }

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
