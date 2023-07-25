const User = require('../models/User');
const Student = require('../models/Student');

async function addStudentData(email, firstName, lastName,  motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied) {
  try {
    // Find the corresponding user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Create a new student record
    const student = new Student({
      email,
      user: user._id, // Set the email as the _id of the corresponding User
      firstName,
      lastName,
      motherName,
      fatherName,
      contactNo,
      city,
      profilePhoto,
      gender,
      courseApplied
    });

    // Save the student record to the database
    await student.save();

    return student;
  } catch (err) {
    throw err;
  }
}

async function getStudentData(userId) {
    try {
      const student = await Student.findOne({ user: userId }).populate('email', 'name email role');
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
  }
module.exports = {
  addStudentData,
  getStudentData
};
