const express = require('express');
const router = express.Router();
const { walletController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/', auth, walletController.coins)



module.exports = router