const express = require('express');
const router = express.Router();
const { marketController } = require('../controllers')
const { auth } = require('../middleware')

router.get('/', auth, marketController.tradeMarket)
router.get('/spot', auth, marketController.spotMarket)
router.get('/orderbook', auth, marketController.orderBook)



module.exports = router