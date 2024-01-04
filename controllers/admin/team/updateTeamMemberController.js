const Team = require("../../../models/Team");
const path = require("path");
const fs = require("fs");

async function deleteFile(filePath) {
  try {
    // Extract the relative path from the URL
    const relativePath = new URL(filePath).pathname;
    const fullPath = path.join(__dirname, "../../../", relativePath);
    console.log("fullPath: ", fullPath);
    await fs.promises.unlink(fullPath);
    console.log("File deleted successfully:", filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

async function updateTeamMember(req, res) {
  try {
    const teamMemberId = req.params.teamMemberId;
    const teamMemberData = req.body;
    console.log("teamMemberData", teamMemberData);

    const team = req.file;
    console.log("team: ", team);
    const teamMember = await Team.findByIdAndUpdate(
      teamMemberId,
      { ...teamMemberData },
      { new: true }
    );
    if (!teamMember) {
      return res.status(200).json({ message: "Team Member Not Found" });
    }
    let teamOldPath = teamMember.profilePhoto;
    if (team) {
      try {
        teamMember.profilePhoto = `http://localhost:4000/${team.path}`;
        if (teamOldPath) {
          await deleteFile(teamOldPath);
          console.log("Cover Picture Deleted SuccessFully");
        }
      } catch (error) {
        console.log(error);
        console.log("Error on Deleting Cover File");
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
