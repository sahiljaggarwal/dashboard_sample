const Course = require("../../../models/Course");

async function getCourseById(req, res) {
  try {
    const course = req.params.courseId;
    const result = await Course.findById(course);
    if (!result) {
      return res.status(200).json({ message: "course not found" });
    }
    console.log("result: ", result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = getCourseById;
