const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  certificateId: {
    type: String,
    required: true,
    unique: true,
  },

  courseName: {
    type: String,
    enum: [
      "Frontend Development",
      "Backend Development",
      "UI/UX Development",
      "Mobile App Development",
      "FullStack Development",
    ],
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  issuedDate: {
    type: Date,
    default: Date.now,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
