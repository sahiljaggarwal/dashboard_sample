const Course = require("../../../models/Course");

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
    if (course) {
      try {
        courseImagePath = course.path;
        addCourse.coverPicture = `http://localhost:4000/${courseImagePath}`;
      } catch (error) {
        console.log(error);
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
