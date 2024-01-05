const Team = require("../../../models/Team");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const config = require("../../..//config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function deleteTeamMember(req, res) {
  try {
    const teamMemberId = req.params.teamMemberId;
    const isTeam = await Team.findById(teamMemberId);
    let oldTeamImagePublicId;
    if (isTeam.coverPicture) {
      const parts = isTeam.profilePhoto.split("/");
      oldTeamImagePublicId = parts[parts.length - 2];
    }
    const teamMember = await Team.findByIdAndRemove(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team Member Not Found" });
    }
    if (oldTeamImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldTeamImagePublicId);
        console.log("Team Image Deleted Successfully");
      } catch (error) {
        console.log("Team Image Not Deleted Error");
        console.log(error);
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Team Member Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = deleteTeamMember;
