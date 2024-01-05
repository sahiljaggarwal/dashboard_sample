const Course = require("../../../models/Course");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
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
//     await fs.promises.unlink(fullPath);
//     console.log("File deleted successfully:", filePath);
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     throw error;
//   }
// }

async function updateCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const updatedData = req.body;
    const course = req.file;
    const coverPicture = course;

    const result = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });
    // console.log("result: => ", result);
    if (!result) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    // let coverPictureOldPath = result.coverPicture;

    // if (coverPicture) {
    //   try {
    //     result.coverPicture = `http://localhost:4000/${coverPicture.path}`;
    //     if (coverPicture) {
    //       await deleteFile(coverPictureOldPath);
    //       console.log("Cover Picture Deleted SuccessFully");
    //     }
    //   } catch (error) {
    //     console.log("Error on deleting cover file");
    //     console.log(error);
    //   }
    // }

    let oldCourseImagePublicId;
    if (result.coverPicture) {
      const parts = result.coverPicture.split("/");
      oldCourseImagePublicId = parts[parts.length - 2];
    }
    if (coverPicture) {
      const courseImagePath = coverPicture.path;
      try {
        const uploadResult = await cloudinary.uploader.upload(
          coverPicture.path
        );
        result.coverPicture = uploadResult.secure_url;
        console.log("Course Image Uploaded Successfully");
        if (oldCourseImagePublicId) {
          await cloudinary.uploader.destroy(oldCourseImagePublicId);
          console.log("Course Image Deleted Successfully From Cloudinary");
        }
      } catch (error) {
        console.log("Course Image Uploading Error");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(courseImagePath);
          console.log("Course Image Deleted Successfully");
        } catch (error) {
          console.log(error);
          console.log("Error on Deleting Cover File");
        }
      }
    }
    await result.save();
    console.log("Course Updated Data ", result);
    return res
      .status(200)
      .json({ message: "Course Updated Succes", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = updateCourse;
