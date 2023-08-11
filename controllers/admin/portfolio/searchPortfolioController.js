const Portfolio = require('../../../models/Portfolio')

async function searchPortfolio(req, res){
    try{
        const query = req.query.query
        const regexQuery = new RegExp(query, 'i')
        /*
        const portfolios = await Portfolio.find({
            $or: [
                {projectTitle:{$regex: query, $options: 'i'}},
                {projectTags:{$regex: query, $options: 'i'}},
            ]
        })
        */
        const portfolios = await Portfolio.find({
            $or: [
                { projectTags: regexQuery },
            ]
        });

        if(!portfolios || portfolios.length==0){
            return res.status(404).json({message: "Portfolio not found"})
        }
        return res.status(200).json({success: true, portfolios})
    } catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal Server Error[Portfolio Search Error]", success: false})
    }
}

module.exports = searchPortfolio