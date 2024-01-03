const User = require("../../models/User");
const Student = require("../../models/Student");
const config = require("../../config/default");

async function getStudentData(userId, baseUrl) {
  try {
    const student = await Student.findOne({ _id: userId }).populate(
      "email",
      "name email role profilePhoto"
    );
    console.log("student: ", student);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw error;
  }
}

module.exports = getStudentData;
