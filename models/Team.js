const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    required: false,
  },
  workRole: {
    type: String,
    enum: [
      "UI/UX Developer",
      "FullStack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Mobile App Developer",
    ],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    // trim: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  contactNo: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate the phone number format
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      },
      message:
        "Invalid phone number format. Phone number should be 10 digits long without any spaces or special characters.",
    },
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
