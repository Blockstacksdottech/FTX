const express = require('express');
const router = express.Router();
const { orderController } = require('../controllers')
const { auth } = require('../middleware')


router.post('/', auth, orderController.createOrder)
// router.get('/live', auth, historicalController.ohcl)



module.exports = router