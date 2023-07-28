const User = require('../../models/User');
const Student = require('../../models/Student');

async function addStudentData(email, firstName, lastName,  motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied) {
    try {
      // Find the corresponding user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new Error('User not found');
      }
  

      // Create a new student record
      const student = new Student({
        email:user.email,
        user: user._id, // Set the email as the _id of the corresponding User
        firstName,
        lastName,
        motherName,
        fatherName,
        contactNo,
        city,
        profilePhoto,
        gender,
        courseApplied,
        role: user.role
      });
  
      // Save the student record to the database
      await student.save();
  
      return student;
    } catch (err) {
      throw err;
    }
  }

module.exports = addStudentData;
  