const express = require('express');
const router = express.Router();
const { 
    adminSpotController,
    adminTraderWalletController,
    adminTokenController,
    adminOrderController,
} = require('../controllers')

const { auth } = require('../middleware')

/** SPOTS */
router.get('/spots', auth, adminSpotController.getSpots)
router.post('/spots', auth, adminSpotController.updateSpots)

/** Trader Wallets */
router.get('/trader-wallet', auth, adminTraderWalletController.wallets)

/** Supported Tokens */
router.get('/tokens', auth, adminTokenController.getTokens)
router.post('/tokens/update', auth, adminTokenController.updateToken)


/** Order */
router.post('/orders/instant-order', auth, adminOrderController.createInstantOrder)
router.put('/orders/instant-order', auth, adminOrderController.updateInstantOrder)
router.delete('/orders/instant-order/:id', auth, adminOrderController.deleteInstantOrder)







module.exports = router