const Portfolio = require("../../../models/Portfolio");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function deletePortfolioController(req, res) {
  try {
    const portfolioId = req.params.portfolioId;
    const isPortfolio = await Portfolio.findById(portfolioId);

    let oldCoverImagePublicId;
    let oldFeaturedImagePublicId;
    let oldPortfolioFilePublicId;

    if (isPortfolio.coverImage) {
      const parts = isPortfolio.coverImage.split("/");
      oldCoverImagePublicId = parts[parts.length - 2];
    }
    if (isPortfolio.featuredImage) {
      const parts = isPortfolio.featuredImage.split("/");
      oldFeaturedImagePublicId = parts[parts.length - 2];
    }

    if (isPortfolio.portfolio) {
      const parts = isPortfolio.portfolio.split("/");
      oldPortfolioFilePublicId = parts[parts.length - 2];
    }

    const portfolio = await Portfolio.findByIdAndRemove(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio Not Found" });
    }

    if (oldCoverImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldCoverImagePublicId);
        console.log("Cover Image Deleted SuccessFully");
      } catch (error) {
        console.log("Error on deleting cover file");
        console.log(error);
      }
    }
    if (oldFeaturedImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldFeaturedImagePublicId);
        console.log("Featured Image Deleted SuccessFully");
      } catch (error) {
        console.log("Error on deleting featured image file");
        console.log(error);
      }
    }
    if (oldPortfolioFilePublicId) {
      try {
        await cloudinary.uploader.destroy(oldPortfolioFilePublicId);
        console.log("Portfolio File Deleted SuccessFully");
      } catch (error) {
        console.log("Error on deleting portfolio file");
        console.log(error);
      }
    }
    return res
      .status(200)
      .json({ message: "Portfolio Delete Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = deletePortfolioController;
