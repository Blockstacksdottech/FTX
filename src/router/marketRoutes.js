const express = require('express');
const router = express.Router();
const { marketController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/spot', auth, marketController.spotMarket)
router.get('/', auth, marketController.tradeMarket)



module.exports = router