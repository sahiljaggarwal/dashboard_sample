const Student = require('../../models/Student');
const User = require('../../models/User');

async function updateStudentData(userId,  firstName, lastName, motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied) {
  try {
    // Find the student to be updated
    const student = await Student.findOne({ user: userId });

    if (!student) {
      throw new Error('Student not found');
    }

    // Update student data
    // student.email = email;
    student.firstName = firstName;
    student.lastName = lastName;
    student.motherName = motherName;
    student.fatherName = fatherName;
    student.contactNo = contactNo;
    student.city = city;
    student.profilePhoto = profilePhoto;
    student.gender = gender;
    student.courseApplied = courseApplied;

    await student.save();

    // Update the corresponding User model
    const user = await User.findById(userId);

    // if (user) {
    //   // Check if the email is different from the previous one
    //   if (email !== user.email) {
    //     // Update the user's email
    //     user.email = email;
    //     await user.save();
    //   }
    // }

    return student;
  } catch (err) {
    throw err;
  }
}

module.exports = updateStudentData