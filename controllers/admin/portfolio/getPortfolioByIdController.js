const Portfolio = require('../../../models/Portfolio')

async function getPortfolioByIdController(req, res){
    try{
        const portfolioId = req.params.portfolioId
        const portfolio = await Portfolio.findById(portfolioId)
        if(!portfolio){
            return res.status(404).json({message: "portfolio not found"})
        }
        return res.status(200).json({portfolio, success:true})
    } catch(error){
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success:false})
    }
}
module.exports = getPortfolioByIdController;