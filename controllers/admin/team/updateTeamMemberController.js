const Team = require("../../../models/Team");

async function deleteFile(filePath) {
  try {
    // Extract the relative path from the URL
    const relativePath = new URL(filePath).pathname;
    const fullPath = path.join(__dirname, "../../../", relativePath);
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
    const team = req.file;
    const teamMember = await Team.findByIdAndUpdate(
      teamMemberId,
      teamMemberData,
      { new: true }
    );
    if (!teamMember) {
      return res.status(200).json({ message: "Team Member Not Found" });
    }
    let teamOldPath = teamMember.profilePhoto;
    if (team) {
      try {
        teamMember.profilePhoto = `http://localhost:4000/${team[0].path}`;
        if (teamOldPath) {
          await deleteFile(teamOldPath);
          console.log("Cover Picture Deleted SuccessFully");
        }
      } catch (error) {
        console.log(error);
        console.log("Error on Deleting Cover File");
      }
    }
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
