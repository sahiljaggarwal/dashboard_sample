const Portfolio = require('../../../models/Portfolio')

async function getPortfoliosController(req, res){
    try{
        const portfolios = await Portfolio.find()
        if(!portfolios){
            return res.status(404).json({message: "portfolios not found"})
        }
        return res.status(200).json({portfolios, success:true})
    } catch(error){
        console.log(error)
        return res.status(500).json({error: "Internal Server Error", success: false})
    }
}

module.exports = getPortfoliosController;