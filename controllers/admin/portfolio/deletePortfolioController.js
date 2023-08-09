const Portfolio = require('../../../models/Portfolio')

async function deletePortfolioController(req, res){
    try {
        const portfolioId = req.params.portfolioId
        const portfolio = await Portfolio.findByIdAndRemove(portfolioId)
        if(!portfolio){
            return res.status(404).json({message: "Portfolio Not Found"})
        }
        return res.status(200).json({message:"Portfolio Delete Successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error", success:false})
    }
}

module.exports = deletePortfolioController