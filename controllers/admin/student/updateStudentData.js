const { studentService } = require('../../../services');

async function updateStudentData(req, res) {
  try {
    const { userId, firstName, lastName, motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied } = req.body;

    // Update student data and sync changes with the User model
    const updatedStudent = await studentService.updateStudentData(userId,  firstName, lastName, motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied);

    res.status(200).json({ message: 'Student data updated successfully', updatedStudent });
  } catch (err) {
    console.error('Error updating student data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = updateStudentData;

