const Portfolio = require("../../../models/Portfolio");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

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

    let oldCoverImagePublicId;
    let oldFeaturedImagePublicId;
    let oldPortfolioFilePublicId;
    if (updatePortfolio.coverImage) {
      const parts = updatePortfolio.coverImage.split("/");
      oldCoverImagePublicId = parts[parts.length - 2];
    }
    if (updatePortfolio.featuredImage) {
      const parts = updatePortfolio.featuredImage.split("/");
      oldFeaturedImagePublicId = parts[parts.length - 2];
    }

    if (updatePortfolio.portfolio) {
      const parts = updatePortfolio.portfolio.split("/");
      oldPortfolioFilePublicId = parts[parts.length - 2];
    }

    if (coverImage) {
      const coverImagePath =
        coverImage && coverImage.length > 0 ? coverImage[0].path : null;
      try {
        const uploadResult = await cloudinary.uploader.upload(coverImagePath);
        updatePortfolio.coverImage = uploadResult.secure_url;
        console.log("Cover Image Uploaded Successfully");
        if (oldCoverImagePublicId) {
          await cloudinary.uploader.destroy(oldCoverImagePublicId);
          console.log("Old Cover Image Deleted Successfully From Cloudinary");
        }
      } catch (error) {
        console.log("Error on Cover Image Upload");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(coverImagePath);
          console.log("Cover Image Deleted Successfully From Local");
        } catch (error) {
          console.log("Error on Cover Image Deletion");
          console.log(error);
        }
      }
    }

    if (featuredImage) {
      const featuredImagePath =
        featuredImage && featuredImage.length > 0
          ? featuredImage[0].path
          : null;
      try {
        const uploadResult = await cloudinary.uploader.upload(
          featuredImagePath
        );
        updatePortfolio.featuredImage = uploadResult.secure_url;
        console.log("Featured Image Uploaded Successfully");
        if (oldFeaturedImagePublicId) {
          await cloudinary.uploader.destroy(oldFeaturedImagePublicId);
          console.log(
            "Old Featured Image Deleted Successfully From Cloudinary"
          );
        }
      } catch (error) {
        console.log("Error on Featured Image Upload");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(featuredImagePath);
          console.log("Featured Image Deleted Successfully From Local");
        } catch (error) {
          console.log("Error on Featured Image Deletion");
          console.log(error);
        }
      }
    }

    if (portfolio) {
      const portfolioFilePath =
        portfolio && portfolio.length > 0 ? portfolio[0].path : null;
      try {
        const uploadResult = await cloudinary.uploader.upload(
          portfolioFilePath
        );
        updatePortfolio.portfolio = uploadResult.secure_url;
        console.log("Portfolio File Uploaded Successfully");
        if (oldPortfolioFilePublicId) {
          await cloudinary.uploader.destroy(oldPortfolioFilePublicId);
          console.log(
            "Old Portfolio File Deleted Successfully From Cloudinary"
          );
        }
      } catch (error) {
        console.log("Error on Portfolio File Upload");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(portfolioFilePath);
          console.log("Portfolio File Deleted Successfully From Local");
        } catch (error) {
          console.log("Error on Portfolio File Deletion");
          console.log(error);
        }
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
