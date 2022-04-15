const express = require('express');
const router = express.Router();
const { marketController } = require('../controllers')
const { auth } = require('../middleware')

router.get('/', marketController.tradeMarket)
router.get('/:type', marketController.market)
router.get('/orderbook', marketController.orderBook)



module.exports = router