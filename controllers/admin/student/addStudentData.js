const studentService = require("../../../services/studentService");

async function addStudentData(req, res) {
  try {
    // Get the data from the request body
    const studentData = req.body;
    const student = req.file;
    const profilePhoto = student;
    if (!student) {
      return res.status(200).json({
        message: "Image is required",
        success: true,
      });
    }
    const fieldsToCheck = [
      "firstName",
      "lastName",
      "fatherName",
      "email",
      "contactNo",
      "pinCode",
      "city",
      "address",
      "qualification",
      "course",
      "dob",
      "paymentMethod",
      "paymentDate",
      "paymentTime",
      "paymentAmount",
    ];

    const emptyFields = [];
    for (const field of fieldsToCheck) {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    }
    if (emptyFields.length > 0) {
      return res.status(200).json({
        message: "Please fill all the required fields",
        emptyFields,
        success: true,
      });
    }
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
    const result = await studentService.addStudentData(data, profilePhoto);
    return res.status(201).json({
      message: "Student data uploaded successfully",
      // student,
      success: true,
    });
  } catch (error) {
    console.log("Error uploading student data:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
}

module.exports = addStudentData;
