const Team = require("../../../models/Team");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function addTeamMember(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      workRole,
      contactNo,
      city,
      experience,
      education,
      address,
    } = req.body;
    const team = req.file;

    const memberData = {
      firstName,
      lastName,
      email,
      workRole,
      contactNo,
      city,
      experience,
      education,
      address,
    };
    const fieldsToCheck = [
      "firstName",
      "lastName",
      "email",
      "workRole",
      "contactNo",
      "city",
      "experience",
      "education",
      "address",
    ];
    const emptyFields = [];
    for (const field of fieldsToCheck) {
      if (!req.body[field]) {
        emptyFields.push(field);
      }
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields", emptyFields });
    }
    const isExistingEmail = await Team.findOne({
      email: email,
    });
    const isExistingContact = await Team.findOne({
      contactNo: contactNo,
    });
    if (isExistingEmail) {
      return res
        .status(200)
        .json({ message: "Email Already Registered", success: true });
    }
    if (isExistingContact) {
      return res
        .status(200)
        .json({ message: "Contact Already Registered", success: true });
    }
    const savedMember = await new Team(memberData);

    // console.log("Team: ", team);
    // if (team) {
    //   savedMember.profilePhoto = `http://localhost:4000/${team.path}`;
    //   await savedMember.save();
    //   return res.status(201).json({
    //     message: "Member Add Successfully",
    //     success: true,
    //     savedMember,
    //   });
    // } else {
    //   return res.status(400).json({ message: "Profile Photo is required" });
    // }
    const teamImagePath = team.path;
    if (team) {
      try {
        const uploadResult = await cloudinary.uploader.upload(team.path);
        savedMember.profilePhoto = uploadResult.secure_url;
        console.log("Team Image Uploaded Successfully");
        await savedMember.save();
      } catch (error) {
        console.log("Team Image Uploading Error");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(teamImagePath);
          console.log("Team Image Deleted Successfully ");
        } catch (error) {
          console.log("Team Image Deleting Error");
          console.log(error);
        }
      }
    } else {
      return res
        .status(400)
        .json({ message: "Team Profile Photo is required" });
    }
    return res.status(201).json({
      message: "Team Member Add Successfully",
      success: true,
      savedMember,
    });
  } catch (error) {
    console.log(error);
    if (error.message === "Image Uploading Error") {
      return res
        .status(500)
        .json({ message: "Image Uploading Error", success: false });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = addTeamMember;
