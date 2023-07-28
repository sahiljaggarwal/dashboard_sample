const User = require('../../models/User');
const Student = require('../../models/Student');
const config = require('../../config/default')

async function getStudentData(userId, baseUrl) {
    try {
      const student = await Student.findOne({ user: userId }).populate('email', 'name email role profilePhoto');
      if (!student) {
        throw new Error('Student not found');
      }
    
    student.profilePhoto = `${baseUrl}/uploads/profilePhotos/${student.profilePhoto}`;

      return student;
    } catch (error) {
      throw error;
    }
  }

module.exports = getStudentData;