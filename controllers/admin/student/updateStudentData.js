const studentService = require('../../../services/studentService');

async function updateStudentData(req, res, next) {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedStudent = await studentService.updateStudentData(userId, updatedData);

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = updateStudentData;
