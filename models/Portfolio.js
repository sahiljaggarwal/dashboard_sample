const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        maxlength: 50
    },
    projectTags: {
        type: String,
        maxlength: 50
    },
    toolsUsed: {
        type: String,
    },
    okkCode: {
        type: String
    },
    projectCategory : {
        type: String
    },
    projectStyle : {
        type: String
    },
    description : {
        type: String,
        maxlength: 150
    },
    liveProjectLink: {
        type: String   
    },
    optional: {
        type: String
    },
    coverImage: {
        type: String
    },
    featuredImage: {
        type: String,
    },
    portfolio: {
        type: String
    }
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;