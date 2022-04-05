/** Trader */
const usersController = require('./userController')
const authController = require('./authController')
const marketController = require('./marketController')
const historicalController = require('./historicalController')
const walletController = require('./walletController')
const orderController = require('./orderController')

/** Admin */
const spotController = require('./admin/spotController')
const traderWalletController = require('./admin/traderWalletController')




module.exports = {
    usersController,
    authController,
    marketController,
    historicalController,
    spotController,
    walletController,
    orderController,
    traderWalletController
}