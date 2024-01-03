const Team = require("../../../models/Team");

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
    const savedMember = new Team({ ...memberData });
    console.log("Team: ", team);
    if (team) {
      savedMember.profilePhoto = `http://localhost:4000/${team.path}`;
      await savedMember.save();
      return res.status(201).json({
        message: "Member Add Successfully",
        success: true,
        savedMember,
      });
    } else {
      return res.status(400).json({ message: "Profile Photo is required" });
    }
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
