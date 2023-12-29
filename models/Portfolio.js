const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectTags: {
    type: String,
    required: true,
  },
  toolsUsed: {
    type: String,
    required: true,
  },
  okkCode: {
    type: String,
    enum: ["everyone", "team", "admin"],
    default: "everyone",
  },
  projectCategory: {
    type: String,
    enum: ["socialmedia", "ecommerce"],
    required: true,
  },
  projectStyle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liveProjectLink: {
    type: String,
    required: true,
  },
  optional: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
