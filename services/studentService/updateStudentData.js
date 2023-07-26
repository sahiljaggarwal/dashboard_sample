const User = require('../../models/User');
const Student = require('../../models/Student');

  async function updateStudentData(userId, updatedData) {
    try {
      // Find the student by userId and update the data
      const updatedStudent = await Student.findOneAndUpdate(
        { email: userId },
        { $set: updatedData },
        { new: true }
      );
  
      if (!updatedStudent) {
        throw new Error('Student not found');
      }
  
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

module.exports = updateStudentData