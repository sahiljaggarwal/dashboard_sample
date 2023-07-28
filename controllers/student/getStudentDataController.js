const  {getStudentData}  = require('../../services/studentService');

async function getStudentDataController(req, res, next) {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the request object after authentication
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const studentData = await getStudentData(userId, baseUrl);
    res.json({ success: true, data: studentData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  getStudentDataController
};
