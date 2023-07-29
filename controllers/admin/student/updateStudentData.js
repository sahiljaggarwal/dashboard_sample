const { studentService } = require('../../../services');

async function updateStudentData(req, res) {
  try {
    const userId = req.params.userId;
    const profilePhoto = req.file.filename;
    const { firstName, lastName, motherName, fatherName, contactNo, city, gender, courseApplied } = req.body;

    // Create an object to store the fields that need to be updated
    const updates = {};

    // Check if each field is provided in the request body and add it to the updates object if it exists
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (motherName) updates.motherName = motherName;
    if (fatherName) updates.fatherName = fatherName;
    if (contactNo) updates.contactNo = contactNo;
    if (city) updates.city = city;
    if (gender) updates.gender = gender;
    if (courseApplied) updates.courseApplied = courseApplied;
    if (profilePhoto) updates.profilePhoto = profilePhoto;

    // Update student data and sync changes with the User model
    const updatedStudent = await studentService.updateStudentData(userId,  updates);

    res.status(200).json({ message: 'Student data updated successfully', updatedStudent });
  } catch (err) {
    console.error('Error updating student data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = updateStudentData;

