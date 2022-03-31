const express = require('express');
const router = express.Router();
const { spotController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/spot', auth, spotController.spotMarket)



module.exports = router