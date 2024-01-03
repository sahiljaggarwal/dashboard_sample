const Student = require("../../models/Student");
const User = require("../../models/User");
const fs = require("fs");
const path = require("path");

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

async function updateStudentData(userId, updates, image) {
  try {
    const student = await Student.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // Store the old profile photo path to delete later
    const oldProfilePhotoPath = student.profilePhoto;

    if (image) {
      student.profilePhoto = `http://localhost:4000/${image.path}`;
      console.log("image: ", image);
      console.log("image path: ", image.path);
      try {
        // Delete the old profile photo
        await deleteFile(oldProfilePhotoPath);
        console.log("Student Image Deleted Successfully");
      } catch (error) {
        console.log(error);
        console.log("Error on Deleting Cover File");
      }
    }

    await student.save();
    return student;
  } catch (err) {
    throw err;
  }
}

module.exports = updateStudentData;
