const studentService = require('../../services/studentService');

async function addStudentData(req, res) {
  try {
    // Get the data from the request body
    const { email, firstName, lastName, motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied } = req.body;

    // Call the service to add student data
    const student = await studentService.addStudentData(email, firstName, lastName,  motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied);

    res.status(201).json({ message: 'Student data uploaded successfully', student });
  } catch (err) {
    console.error('Error uploading student data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = addStudentData;