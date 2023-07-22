const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
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
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
      },
      role: {
        type: String,
        enum: ['admin', 'hr', 'teacher', 'student'],
        required: [true, 'Role is required'],
      },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationOTP: {
    type: Number,
  },
  verificationExpiry: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
