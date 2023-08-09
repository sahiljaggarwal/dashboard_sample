const Portfolio = require('../../../models/Portfolio')

async function updatePortfolioController(req, res){
    try {
        const portfolioId = req.params.portfolioId
        const updatedData = req.body
        const portfolio = await Portfolio.findByIdAndUpdate(portfolioId, updatedData, {new: true})
        if(!portfolio){
            return res.status(404).json({message: "Portfolio not found"})
        }
        return res.status(200).json({message: "portfolio updated successfully", success:true, portfolio})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = updatePortfolioController