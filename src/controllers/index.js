/** Trader */
const usersController = require('./userController')
const authController = require('./authController')
const marketController = require('./marketController')
const historicalController = require('./historicalController')
const walletController = require('./walletController')
const orderController = require('./orderController')

/** Admin */
const adminSpotController = require('./admin/adminSpotController')
const adminTraderWalletController = require('./admin/adminTraderWalletController')
const adminTokenController = require('./admin/adminTokenController')
const adminOrderController = require('./admin/adminOrderController')
const adminReportController = require('./admin/adminReportController')
const adminUsersController = require('./admin/adminUsersController')




module.exports = {
    /** Trader Controllers */
    usersController,
    authController,
    marketController,
    historicalController,
    walletController,
    orderController,
    /** Admin Controllers */
    adminSpotController,
    adminTraderWalletController,
    adminTokenController,
    adminOrderController,
    adminReportController,
    adminUsersController
}