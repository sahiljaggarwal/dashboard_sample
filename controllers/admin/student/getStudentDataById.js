const { studentService } = require('../../../services');

async function getStudentDataById(req, res) {
  try {
    const { studentId } = req.params;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const student = await studentService.getStudentData(studentId, baseUrl);
    const response = {success: true, data: student}
  //  return res.status(200).json(student);
   return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch student', success: false});
  }
}

module.exports = getStudentDataById;