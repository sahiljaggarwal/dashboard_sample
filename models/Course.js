const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    coverPicture: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    // mainCourse: {
    //     type: String,
    //     enum: ['Frontend', 'Backend', 'UI/UX', 'Mobile'],
    //     required: true
    // }
    qualification: {
      type: String,
      enum: [
        "10th",
        "12th",
        "Graduation",
        "Post Graduation",
        "Diploma",
        "Others",
        "everyone",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
