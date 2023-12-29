const Portfolio = require("../../../models/Portfolio");
const portfolioService = require("../../../services/");
const path = require("path");

async function addPortfolioController(req, res) {
  try {
    console.log("controller is running");

    const {
      projectTitle,
      projectTags,
      toolsUsed,
      projectStyle,
      okkCode,
      liveProjectLink,
      description,
      projectCategory,
      optional,
    } = req.body;

    // Use req.files to access files uploaded using upload.fields
    const coverImage = req.files.coverImage[0];
    const featuredImage = req.files.featuredImage[0];
    const portfolioFile = req.files.portfolio[0];

    console.log(req.body);

    // Check if any required field is missing
    if (
      !projectTitle ||
      !projectTags ||
      !toolsUsed ||
      !okkCode ||
      !projectCategory ||
      !projectStyle ||
      !description ||
      !liveProjectLink ||
      !optional ||
      !coverImage ||
      !featuredImage ||
      !portfolioFile
    ) {
      return res
        .status(400)
        .json({ message: "All Fields Are Required", success: false });
    }

    const portfolioData = {
      projectTitle,
      projectTags,
      toolsUsed,
      okkCode,
      projectCategory,
      projectStyle,
      description,
      liveProjectLink,
      optional,
    };

    const savedPortfolio = new Portfolio(portfolioData);

    // Update paths to include the correct upload directory
    if (coverImage) {
      savedPortfolio.coverImage = `http://localhost:4000/uploads/cover/${coverImage.filename}`;
    }

    if (featuredImage) {
      savedPortfolio.featuredImage = `http://localhost:4000/uploads/featured/${featuredImage.filename}`;
    }

    if (portfolioFile) {
      savedPortfolio.portfolio = `http://localhost:4000/uploads/portfolio/${portfolioFile.filename}`;
    }

    await savedPortfolio.save();

    return res.status(201).json({
      success: true,
      message: "Portfolio added successfully",
      savedPortfolio,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = addPortfolioController;
