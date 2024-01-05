const Student = require("../../models/Student");
const User = require("../../models/User");
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

async function updateStudentData(userId, updates, image) {
  try {
    const student = await Student.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // Store the old profile photo path to delete later

    let oldProfilePublicId;
    if (student.profilePhoto) {
      const parts = student.profilePhoto.split("/");
      oldProfilePublicId = parts[parts.length - 2];
    }
    if (image) {
      const profilePhotoPath = image.path;
      try {
        const uploadResult = await cloudinary.uploader.upload(image.path);
        student.profilePhoto = uploadResult.url;
        if (oldProfilePublicId) {
          await cloudinary.uploader.destroy(oldProfilePublicId);
          console.log("Student Image Uploaded");
        }
      } catch (error) {
        console.log("Error on Uploading Student Image File");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(profilePhotoPath);
          console.log("Student Image Deleted Successfully");
        } catch (error) {
          console.log(error);
          console.log("Error on Deleting Student Image File");
        }
      }
    }

    // if (image) {
    //   student.profilePhoto = `http://localhost:4000/${image.path}`;
    //   console.log("image: ", image);
    //   console.log("image path: ", image.path);
    //   try {
    //     // Delete the old profile photo
    //     await deleteFile(oldProfilePhotoPath);
    //     console.log("Student Image Deleted Successfully");
    //   } catch (error) {
    //     console.log(error);
    //     console.log("Error on Deleting Cover File");
    //   }
    // }

    await student.save();
    return student;
  } catch (err) {
    console.log("Error on updating student data:", err);
    throw err;
  }
}

module.exports = updateStudentData;
