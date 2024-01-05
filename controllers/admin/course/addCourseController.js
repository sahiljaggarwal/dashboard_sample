const Course = require("../../../models/Course");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function addCourse(req, res) {
  try {
    const { name, description, qualification } = req.body;
    const course = req.file;
    console.log(
      "name, desciption, qualification image-> ",
      name,
      description,
      qualification,
      course
    );
    if (!name || !description || !qualification) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: true });
    }
    const addCourse = await new Course({
      name,
      description,
      qualification,
    });
    // if (course) {
    //   try {
    //     courseImagePath = course.path;
    //     addCourse.coverPicture = `http://localhost:4000/${courseImagePath}`;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const courseImagePath = course.path;
    if (course) {
      try {
        const result = await cloudinary.uploader.upload(course.path);
        addCourse.coverPicture = result.secure_url;
        console.log("Course Image Uploaded Successfully");
      } catch (error) {
        console.log("Course Error on Uploading Cover File");
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
    await addCourse.save();
    console.log("data ", addCourse);

    return res
      .status(201)
      .json({ message: "Course Add Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = addCourse;
