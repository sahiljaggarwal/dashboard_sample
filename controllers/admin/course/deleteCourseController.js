const Course = require("../../../models/Course");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const config = require("../../../config/default");

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
//     console.log("fullPath: ", fullPath);
//     await fs.promises.unlink(fullPath);
//     console.log("File deleted successfully:", filePath);
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     throw error;
//   }
// }

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const isExistingCourse = await Course.findById(courseId);

    let oldCourseImagePublicId;
    if (isExistingCourse.coverPicture) {
      const parts = isExistingCourse.coverPicture.split("/");
      oldCourseImagePublicId = parts[parts.length - 2];
    }

    // if (isExistingCourse.coverPicture) {
    //   await deleteFile(isExistingCourse.coverPicture);
    // }
    const course = await Course.findByIdAndRemove(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }
    if (oldCourseImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldCourseImagePublicId);
        console.log("Course Image Deleted Successfully");
      } catch (error) {
        console.log("Course Image Not Deleted Error");
        console.log(error);
      }
    }
    return res
      .status(200)
      .json({ message: "Course Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = deleteCourse;
