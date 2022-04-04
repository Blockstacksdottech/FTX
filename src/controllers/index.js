const usersController = require('./userController')
const authController = require('./authController')
const marketController = require('./marketController')
const historicalController = require('./historicalController')
const spotController = require('./admin/spotController')


module.exports = {
    usersController,
    authController,
    marketController,
    historicalController,
    spotController
}