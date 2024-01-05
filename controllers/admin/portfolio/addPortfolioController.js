const Portfolio = require("../../../models/Portfolio");
const portfolioService = require("../../../services/");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = require("../../../config/default");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

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

    const savedPortfolio = await new Portfolio(portfolioData);

    // Update paths to include the correct upload directory
    // if (coverImage) {
    //   savedPortfolio.coverImage = `http://localhost:4000/uploads/cover/${coverImage.filename}`;
    // }

    // if (featuredImage) {
    //   savedPortfolio.featuredImage = `http://localhost:4000/uploads/featured/${featuredImage.filename}`;
    // }

    // if (portfolioFile) {
    //   savedPortfolio.portfolio = `http://localhost:4000/uploads/portfolio/${portfolioFile.filename}`;
    // }

    const coverImagePath = coverImage.path;
    if (coverImage) {
      try {
        const uploadResult = await cloudinary.uploader.upload(coverImage.path);
        savedPortfolio.coverImage = uploadResult.secure_url;
        console.log("Cover Image Uploaded Successfully");
      } catch (error) {
        console.log("Cover Image Uploading Error");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(coverImagePath);
          console.log("Cover Image Deleted Successfully ");
        } catch (error) {
          console.log("Cover Image Deleting Error");
          console.log(error);
        }
      }
    }

    const portfolioImagePath = portfolioFile.path;
    if (portfolioFile) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          portfolioFile.path
        );
        savedPortfolio.portfolio = uploadResult.secure_url;
        console.log("Portfolio File Uploaded Successfully");
      } catch (error) {
        console.log("Portfolio File Uploading Error");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(portfolioImagePath);
          console.log("Portfolio File Deleted Successfully ");
        } catch (error) {
          console.log("Portfolio File Deleting Error");
          console.log(error);
        }
      }
    }

    const featuredImagePath = featuredImage.path;
    if (featuredImage) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          featuredImage.path
        );
        savedPortfolio.featuredImage = uploadResult.secure_url;
        console.log("Featured Image Uploaded Successfully");
      } catch (error) {
        console.log("Featured Image Uploading Error");
        console.log(error);
      } finally {
        try {
          fs.unlinkSync(featuredImagePath);
          console.log("Featured Image Deleted Successfully ");
        } catch (error) {
          console.log("Featured Image Deleting Error");
          console.log(error);
        }
      }
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
