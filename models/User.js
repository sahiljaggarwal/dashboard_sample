const mongoose = require('mongoose');
const Student = require('./Student')
const bcrypt = require('bcrypt')

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
        default: true,
      },
    verificationOTP: {
      type: Number,
      },
    verificationExpiry: {
      type: Date,
     },

},{timestamps: true});

// Pre-save middleware to propagate email update to other models
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('email')) {
      // Update email in other models that reference this user by email
      await Student.updateMany({ user: this._id }, { $set: { email: this.email } });
      // Add other models here as needed
    }
    next();
  } catch (err) {
    next(err);
  }
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});


// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const saltRounds = 10;
//     const hashedPassword = await new Promise((resolve, reject) => {
//       bcrypt.hash(this.password, saltRounds, (err, hash) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(hash);
//         }
//       });
//     });

//     this.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });


// Pre-remove middleware to delete student record when user is deleted
userSchema.pre('remove', async function (next) {
  try {
    // Find the corresponding student and delete it
    await Student.deleteOne({ user: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
