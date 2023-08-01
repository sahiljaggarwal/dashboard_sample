const {studentService}= require('../../../services/');

async function getAllStudentsData(req, res) {
  try {
    const students = await studentService.getAllStudentsData();
    const response = {
      success: true,
      data: students
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching all students:', err);
    return res.status(500).json({ error: 'Failed to fetch students', success:false });
  }
}

module.exports =  getAllStudentsData ;