const mongoose = require('mongoose')
const User = require('./User')
// const User = mongoose.model('User');

const studentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    email: {
        type:  String,
        required: true,
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
    profilePhoto: {
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    motherOccupation:{
        type: String,


    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    fatherOccupation:{
        type: String,

        trim: true,
    },
    role:{
        type: String
    },
    contactNo: {
        type: Number,
        required: true,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function (value) {
                // Regular expression to validate the phone number format
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: 'Invalid phone number format. Phone number should be 10 digits long without any spaces or special characters.',
        },
    },
    parentsNo: {
        type: Number,
        trim: true,
        validate: {
            validator: function (value) {
                // Regular expression to validate the phone number format
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: 'Invalid phone number format. Phone number should be 10 digits long without any spaces or special characters.',
        },
    },
    residenceAddress: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    state:{
        type: String,
        // required: [true, 'City is required'],
        trim: true,
    },
    pincode:{
        type: String
    },
    qualification:[{
        type: Array
    }],
    university:{
        type: String
    },
    gender:{
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required'],
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    age:{
        type: Number,
    },
    courseApplied:{
        type: String,
        enum: ['Frontend-Development', 'Backend-Development', 'UI/UX-Development', 'Mobile-Development', 'FullStack-Development'],
        required: [true, 'Course is required'],

    },

    grade:{
        type: String,
        // required: [true, 'Grade is required'],
        trim: true,
    },
    birthday:{
        type: Date,
        validate: {
            validator: function (value) {
                // Check if the value is a valid date
                return !isNaN(new Date(value));
            },
            message: 'Invalid birthday format. Please provide a valid date.',
        },
    },
    attendance: {
        type: Number,
        default: 0,
    },

}, {timestamps: true})

// Function to fetch user by ID
// async function getUserById(userId) {
//     const User = mongoose.model('User');
//     return User.findById(userId);
//   }

// Pre-save middleware to calculate and set the age
studentSchema.pre('save', function (next) {
    if (this.birthday) {
        const today = new Date();
        const birthDate = new Date(this.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        this.age = age;
    }
    next();
});

/// Pre-save middleware to check if email is modified and sync it with the User model
// studentSchema.pre('save', async function (next) {
//     if (this.isModified('email')) {
//       try {
//         const user = await User.findOne({email: this.email});
//         if (user) {
//           user.user = user._id;
//           await user.save();
//           console.log('Email updated in User model:', user.email);
//         } else {
//           console.log('User not found in User model');
//         }
//       } catch (err) {
//         console.error('Error updating email in User model:', err);
//         next(err);
//       }
//     }
//     next();
//   });

const Student = mongoose.model('Student', studentSchema);

// module.exports = {Student, getUserById};
module.exports = Student;