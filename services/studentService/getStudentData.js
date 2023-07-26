const User = require('../../models/User');
const Student = require('../../models/Student');

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

module.exports = getStudentData;