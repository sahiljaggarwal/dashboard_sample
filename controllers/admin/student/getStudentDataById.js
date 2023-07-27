const { studentService } = require('../../../services');

async function getStudentDataById(req, res) {
  try {
    const { studentId } = req.params;
    const student = await studentService.getStudentData(studentId);
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
}

module.exports = getStudentDataById;