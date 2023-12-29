const Course = require("../../../models/Course");

async function getAllCourse(req, res) {
  try {
    const course = await Course.find();
    if (!course) {
      return res.status(200).json({ message: "Courses not found" });
    }
    return res
      .status(200)
      .json({ success: true, course, message: "Course Data" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = getAllCourse;
