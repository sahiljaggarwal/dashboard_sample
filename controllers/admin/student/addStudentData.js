const studentService = require("../../../services/studentService");
const Student = require("../../../models/Student");
const fs = require("fs");
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
    if (studentData.contactNo) {
      if (studentData.contactNo.length !== 10) {
        return res
          .status(200)
          .json({
            message: "Contact No. should be of 10 digits",
            success: true,
          });
      }
    }

    const isEmailExist = await Student.findOne({ email: studentData.email });
    const isContactNo = await Student.findOne({
      contactNo: studentData.contactNo,
    });

    if (isEmailExist) {
      if (profilePhoto) {
        try {
          const profilePhotoPath = profilePhoto.path;
          fs.unlinkSync(profilePhotoPath);
          console.log("Student Image Deleted Successfully From Locally");
        } catch (error) {
          console.log("Student Image Deleted Successfully From Locally");
          console.log(error);
        }
      }
      return res
        .status(200)
        .json({ message: "Email already exists", success: true });
    }
    if (isContactNo) {
      if (profilePhoto) {
        try {
          const profilePhotoPath = profilePhoto.path;
          fs.unlinkSync(profilePhotoPath);
        } catch (error) {
          console.log("Student Image Deleted Successfully From Locally");
          console.log(error);
        }
      }
      return res
        .status(200)
        .json({ message: "Contact No. already exists", success: true });
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
