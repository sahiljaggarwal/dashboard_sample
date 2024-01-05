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

// async function deleteFile(filePath) {
//   try {
//     // Extract the relative path from the URL
//     const relativePath = new URL(filePath).pathname;
//     const fullPath = path.join(__dirname, "../../../", relativePath);
//     console.log("fullPath: ", fullPath);
//     await fs.promises.unlink(fullPath);
//     console.log("File deleted successfully:", filePath);
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     throw error;
//   }
// }

async function updateTeamMember(req, res) {
  try {
    const teamMemberId = req.params.teamMemberId;
    const teamMemberData = req.body;
    // console.log("teamMemberData", teamMemberData);

    const team = req.file;
    // console.log("team: ", team);
    const teamMember = await Team.findByIdAndUpdate(
      teamMemberId,
      { ...teamMemberData },
      { new: true }
    );
    if (!teamMember) {
      return res.status(200).json({ message: "Team Member Not Found" });
    }
    // let teamOldPath = teamMember.profilePhoto;
    // if (team) {
    //   try {
    //     teamMember.profilePhoto = `http://localhost:4000/${team.path}`;
    //     if (teamOldPath) {
    //       await deleteFile(teamOldPath);
    //       console.log("Cover Picture Deleted SuccessFully");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     console.log("Error on Deleting Cover File");
    //   }
    // }

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
