const User = require("../../models/User");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});
const Student = require("../../models/Student");

async function addStudentData(data, profilePhoto) {
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
    const student = await new Student({
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
    // if (student) {
    //   student.profilePhoto = `http://localhost:4000/${profilePhoto}`;
    // }

    const profilePhotoPath = profilePhoto.path;
    if (profilePhoto) {
      try {
        const uploadResult = await cloudinary.uploader.upload(profilePhotoPath);
        student.profilePhoto = uploadResult.secure_url;
        console.log("Profile Photo Uploaded Successfully");
      } catch (error) {
        console.log("Error on Uploading Profile Photo");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(profilePhotoPath);
          console.log("Profile Photo Deleted Successfully Locally");
        } catch (error) {
          console.log("Error on Deleting Profile Photo");
          console.log(error);
        }
      }
    }
    await student.save();

    return student;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { addStudentData };
