const mongoose = require("mongoose");
const User = require("./User");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    registerId: {
      type: String,
      default: null,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    contactNo: {
      type: Number,
      required: true,
      required: [true, "Phone number is required"],
      // trim: true,
      // validate: {
      //   validator: function (value) {
      //     // Regular expression to validate the phone number format
      //     const phoneRegex = /^\d{10}$/;
      //     return phoneRegex.test(value);
      //   },
      //   message:
      //     "Invalid phone number format. Phone number should be 10 digits long without any spaces or special characters.",
      // },
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      enum: ["hisar", "bhiwani", "sirsa"],
    },

    pincode: {
      type: String,
    },
    qualification: {
      type: {
        type: String,
        enum: ["bachelors", "10th", "12th", "master", "diploma", "certificate"],
      },
    },
    course: [
      {
        type: String,
        enum: ["frontend", "backend", "ui/ux", "mobile", "fullstack"],
      },
    ],
    dob: {
      type: Date,
    },

    // Payment Details
    paymentAmount: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["Bank Transfer", "UPI", "Cash"],
      default: null,
    },
    paymentDate: {
      type: Date,
      default: null,
    },
    paymentTime: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
