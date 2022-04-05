const express = require('express');
const router = express.Router();
const { 
    spotController, 
    tokenController, 
    traderWalletController 
} = require('../controllers')

const { auth } = require('../middleware')

/** SPOTS */
router.get('/spots', auth, spotController.getSpots)
router.post('/spots', auth, spotController.updateSpots)

/** Trader Wallets */
router.get('/trader-wallet', auth, traderWalletController.wallets)

/** Supported Tokens */
router.get('/tokens', auth, tokenController.getTokens)
router.post('/tokens/update', auth, tokenController.updateToken)






module.exports = router