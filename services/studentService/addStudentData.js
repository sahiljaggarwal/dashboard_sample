const User = require("../../models/User");
const Student = require("../../models/Student");

async function addStudentData(data, student) {
  try {
    const {
      firstName,
      lastName,
      fatherName,
      email,
      contactNo,
      city,
      address,
      pincode,
      qualification,
      course,
      dob,
      paymentAmount,
      paymentDate,
      paymentTime,
      paymentMethod,
    } = data;

    const fieldsToCheck = [
      "firstName",
      "lastName",
      "fatherName",
      "email",
      "contactNo",
      "city",
      "address",
      "pincode",
      "qualification",
      "course",
      "dob",
    ];
    const emptyFields = [];
    for (const field of fieldsToCheck) {
      if (!data[field]) {
        emptyFields.push(field);
      }
    }
    if (emptyFields.length > 0) {
      const emptyFieldsString = emptyFields.join(" , ");
      console.log(`Please provide ${emptyFieldsString}`);
      throw new Error(`Please provide ${emptyFieldsString}`);
    }

    // Create a new student record
    const student = new Student({
      email,
      firstName,
      lastName,
      address,
      fatherName,
      contactNo,
      city,
      pincode,
      qualification,
      course,
      dob,
      paymentAmount,
      paymentDate,
      paymentTime,
      paymentMethod,
    });
    if (student) {
      student.profilePhoto = `http://localhost:4000/${student.profilePhoto}`;
    }
    await student.save();

    return student;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { addStudentData };
