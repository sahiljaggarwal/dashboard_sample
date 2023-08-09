const Portfolio = require('../../../models/Portfolio')
const portfolioService = require('../../../services/')

console.log(portfolioService.addPortfolioService)

async function addPortfolioController(req,res){
    try {
        const {
            projectTitle,
            projectTags,
            toolsUsed,
            okkCode,
            projectCategory,
            projectStyle,
            description,
            liveProjectLink,
            optional,
            coverImage,
            featuredImage,
            portfolio,} = req.body
        
        const portfolioData = {
            projectTitle,
            projectTags,
            toolsUsed,
            okkCode,
            projectCategory,
            projectStyle,
            description,
            liveProjectLink,
            optional,
            coverImage,
            featuredImage,
            portfolio,
        };
        const savedPortfolio = new Portfolio(portfolioData);
        await savedPortfolio.save()
        return res.status(201).json({success: true, message:"portfolio add successfully", savedPortfolio})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = addPortfolioController;