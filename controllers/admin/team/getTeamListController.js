const Team = require("../../../models/Team");

async function getTeamList(req, res) {
  try {
    const team = await Team.find();
    if (!team) {
      return res.status(404).json({ message: "Team Not Found" });
    }
    return res.status(200).json({ message: "Team Data", team, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = getTeamList;
