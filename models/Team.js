const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    contactNo: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    experience: {
        type: String
    },
    education: {
        type: String
    }
})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team;