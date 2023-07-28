const { studentService } = require('../../../services');

async function getStudentDataById(req, res) {
  try {
    const { studentId } = req.params;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const student = await studentService.getStudentData(studentId, baseUrl);
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
}

module.exports = getStudentDataById;