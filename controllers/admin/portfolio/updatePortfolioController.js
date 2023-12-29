const Portfolio = require("../../../models/Portfolio");
const path = require("path");
const fs = require("fs");

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

async function updatePortfolioController(req, res) {
  try {
    const portfolioId = req.params.portfolioId;
    const updatedData = req.body;
    const coverImage = req.files.coverImage;
    const featuredImage = req.files.featuredImage;
    const portfolio = req.files.portfolio;

    const updatePortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      updatedData,
      { new: true }
    );
    if (!updatePortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    let coverImageOldPath = updatePortfolio.coverImage;
    let featuredImageOldPath = updatePortfolio.featuredImage;
    let portfolioFileOldPath = updatePortfolio.portfolio;

    if (coverImage) {
      try {
        updatePortfolio.coverImage = `http://localhost:4000/${coverImage[0].path}`;
        if (coverImageOldPath) {
          await deleteFile(coverImageOldPath);
          console.log("Cover Image Deleted SuccessFully");
        }
      } catch (error) {
        console.log("Error on deleting cover file");
        console.log(error);
      }
    }
    if (featuredImage) {
      try {
        updatePortfolio.featuredImage = `http://localhost:4000/${featuredImage[0].path}`;
        if (featuredImageOldPath) {
          await deleteFile(featuredImageOldPath);
          console.log("Featured Image Deleted SuccessFully");
        }
      } catch (error) {
        console.log("Error on deleting featured file");
        console.log(error);
      }
    }
    if (portfolio) {
      try {
        updatePortfolio.portfolio = `http://localhost:4000/${portfolio[0].path}`;
        if (portfolioFileOldPath) {
          await deleteFile(portfolioFileOldPath);
          console.log("Portfolio File Deleted SuccessFully");
        }
      } catch (error) {
        console.log("Error on deleting portfolio file");
        console.log(error);
      }
    }
    await updatePortfolio.save();
    return res.status(200).json({
      message: "portfolio updated successfully",
      success: true,
      updatePortfolio,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = updatePortfolioController;
