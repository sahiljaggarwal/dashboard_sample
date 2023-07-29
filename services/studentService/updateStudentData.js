const Student = require('../../models/Student');
const User = require('../../models/User');
const fs = require('fs');
const path = require('path');

async function updateStudentData(userId, updates) {
  try {
    const student = await Student.findOne({ user:userId });

    if (!student) {
      throw new Error('Student not found');
    }

    // Store the old profile photo path to delete later
    const oldProfilePhotoPath = student.profilePhoto;

     // Update student data based on the provided updates object
     for (const key in updates) {
      student[key] = updates[key];
    }

    await student.save();

    // Update the corresponding User model
    // const user = await User.findById(userId);

    // Delete the old profile photo
    if (oldProfilePhotoPath) {
      const oldProfilePhotoFullPath = path.join(__dirname, '..', '..', 'uploads','profilePhotos', oldProfilePhotoPath);
      fs.unlinkSync(oldProfilePhotoFullPath);
    }


    return student;
  } catch (err) {
    throw err;
  }
}

module.exports = updateStudentData