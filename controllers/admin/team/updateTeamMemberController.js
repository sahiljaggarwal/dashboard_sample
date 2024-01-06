const Team = require("../../../models/Team");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function updateTeamMember(req, res) {
  console.log("CONTROLLER IS RUNNING");
  try {
    const teamMemberId = req.params.teamMemberId;
    const teamMemberData = req.body;
    const team = req.file;
    const { email, contactNo } = teamMemberData;
    const existingTeamMemberEmail = await Team.findOne({
      email,
      _id: { $ne: teamMemberId },
    });

    const existingTeamMemberContactNo = await Team.findOne({
      email,
      contactNo,
      _id: { $ne: teamMemberId },
    });

    if (existingTeamMemberEmail) {
      if (team) {
        try {
          const ImagePath = team.path;
          fs.unlinkSync(ImagePath);
          console.log("Team Image Deleted");
        } catch (error) {
          console.log("Error Deleteing Team Image From Local");
          console.log(error);
        }
      }
      return res.status(200).json({
        message: "Email is already in use by another user",
        success: true,
      });
    }
    if (existingTeamMemberContactNo) {
      if (team) {
        try {
          const ImagePath = team.path;
          fs.unlinkSync(ImagePath);
          console.log("Team Image Deleted");
        } catch (error) {
          console.log("Error Deleteing Team Image From Local");
          console.log(error);
        }
      }
      return res.status(200).json({
        message: "Contact No. is already in use by another user",
        success: true,
      });
    }

    const teamMember = await Team.findByIdAndUpdate(
      teamMemberId,
      { ...teamMemberData },
      { new: true }
    );
    if (!teamMember) {
      return res.status(200).json({ message: "Team Member Not Found" });
    }

    let oldTeamImagePublicId;
    if (teamMember.profilePhoto) {
      const parts = teamMember.profilePhoto.split("/");
      oldTeamImagePublicId = parts[parts.length - 2];
    }

    if (team) {
      const teamImagePath = team.path;
      try {
        const uploadResult = await cloudinary.uploader.upload(team.path);
        teamMember.profilePhoto = uploadResult.secure_url;
        if (oldTeamImagePublicId) {
          try {
            await cloudinary.uploader.destroy(oldTeamImagePublicId);
            console.log("Team Picture Deleted SuccessFully From Cloudinary");
          } catch (error) {
            console.log("Error ON Deleting Team Photo File From Cloudinary");
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
        console.log("Error on Deleting Team Photo File");
      } finally {
        try {
          fs.unlinkSync(teamImagePath);
          console.log("Team Photo Deleted SuccessFully");
        } catch (error) {
          console.log(error);
          console.log("Error on Deleting Team Photo File");
        }
      }
    }
    await teamMember.save();
    return res.status(200).json({
      message: "Team Member Data Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
}

module.exports = updateTeamMember;
