const Student = require('../../models/Student');

async function getAllStudentsData() {
  try {
    const students = await Student.find();
    return students;
  } catch (err) {
    throw err;
  }
}

module.exports =  getAllStudentsData ;