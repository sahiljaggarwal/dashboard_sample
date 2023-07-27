const {studentService}= require('../../../services/');

async function getAllStudentsData(req, res) {
  try {
    const students = await studentService.getAllStudentsData();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching all students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}

module.exports =  getAllStudentsData ;