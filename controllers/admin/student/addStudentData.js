const studentService = require('../../../services/studentService');

async function addStudentData(req, res) {
  try {
    // Get the data from the request body
    const { email, firstName, lastName, motherName, fatherName, contactNo, city, gender, courseApplied } = req.body;
    const profilePhoto = req.file.filename;
    // Call the service to add student data
    const student = await studentService.addStudentData(email, firstName, lastName,  motherName, fatherName, contactNo, city, profilePhoto, gender, courseApplied);

    return res.status(201).json({ message: 'Student data uploaded successfully', student, success: true });
  } catch (err) {
    console.error('Error uploading student data:', err);
    return res.status(500).json({ error: 'Internal server error', success:false });
  }
}

module.exports = addStudentData;