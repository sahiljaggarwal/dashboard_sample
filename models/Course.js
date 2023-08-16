const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    coverPicture: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    mainCourse: {
        type: String,
        enum: ['Frontend', 'Backend', 'UI/UX', 'Mobile'],
        required: true
    }
}, {timestamps: true})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course