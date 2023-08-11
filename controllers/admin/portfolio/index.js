const addPortfolioController = require('./addPortfolioController')
const getPortfoliosController =  require('./getPortfoliosController')
const getPortfolioByIdController = require('./getPortfolioByIdController')
const deletePortfolioController = require('./deletePortfolioController')
const updatePortfolioController = require('./updatePortfolioController')
const searchPortfolio = require('./searchPortfolioController')

module.exports = {
    addPortfolioController,
    getPortfoliosController,
    getPortfolioByIdController,
    deletePortfolioController,
    updatePortfolioController,
    searchPortfolio
}