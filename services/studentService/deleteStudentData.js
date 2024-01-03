const Student = require("../../models/Student");

async function deleteFile(filePath) {
  try {
    // Extract the relative path from the URL
    const relativePath = new URL(filePath).pathname;
    const fullPath = path.join(__dirname, "../../../", relativePath);
    await fs.promises.unlink(fullPath);
    console.log("File deleted successfully:", filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
async function deleteStudentData(studentId) {
  try {
    const existingStudent = await Student.findOne({ _id: studentId });

    let studentImageOldPath = existingStudent.profilePhoto;

    if (existingStudent.profilePhoto && studentImageOldPath) {
      await deleteFile(studentImageOldPath);
      console.log("Student Image Deleted Successfully");
      {
      }
      const student = await Student.findByIdAndRemove(studentId);
      if (!student) {
        throw new Error("Student Not Found");
      }
      return { message: "Student Deleted Successfully" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = deleteStudentData;
