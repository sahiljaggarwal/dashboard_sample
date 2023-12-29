const studentService = require("../../../services/studentService");

async function addStudentData(req, res) {
  try {
    // Get the data from the request body
    const studentData = req.body;
    const student = req.file;

    // const profilePhoto = req.file.filename;
    const data = {
      email: studentData.email,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      fatherName: studentData.fatherName,
      contactNo: studentData.contactNo,
      // registerId: studentData.registerId,
      pincode: studentData.pinCode,
      city: studentData.city,
      address: studentData.address,
      // profilePhoto: profilePhoto,
      qualification: studentData.qualification,
      course: studentData.course,
      dob: studentData.dob,
      paymentMethod: studentData.paymentMethod,
      paymentDate: studentData.paymentDate,
      paymentTime: studentData.paymentTime,
      paymentAmount: studentData.paymentAmount,
    };
    const result = await studentService.addStudentData(data, student);
    return res.status(201).json({
      message: "Student data uploaded successfully",
      // student,
      success: true,
    });
  } catch (err) {
    console.error("Error uploading student data:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
}

module.exports = addStudentData;
