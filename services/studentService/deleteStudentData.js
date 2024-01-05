const Student = require("../../models/Student");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const config = require("../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

// async function deleteFile(filePath) {
//   try {
//     // Extract the relative path from the URL
//     const relativePath = new URL(filePath).pathname;
//     const fullPath = path.join(__dirname, "../../../", relativePath);
//     await fs.promises.unlink(fullPath);
//     console.log("File deleted successfully:", filePath);
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     throw error;
//   }
// }
async function deleteStudentData(studentId) {
  try {
    const existingStudent = await Student.findOne({ _id: studentId });

    let oldProfilePublicId;
    if (existingStudent.profilePhoto) {
      const parts = existingStudent.profilePhoto.split("/");
      oldProfilePublicId = parts[parts.length - 2];
    }
    const student = await Student.findByIdAndRemove(studentId);
    if (!student) {
      throw new Error("Student Not Found");
    }

    if (oldProfilePublicId) {
      try {
        await cloudinary.uploader.destroy(oldProfilePublicId);
        console.log("Student Image Deleted Successfully");
      } catch (error) {
        console.log("Student Image Deleted Successfully");
        console.log(error);
      }
    }
    return { message: "Student Deleted Successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = deleteStudentData;
