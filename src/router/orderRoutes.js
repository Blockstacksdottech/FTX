const express = require('express');
const router = express.Router();
const { orderController } = require('../controllers')
const { auth } = require('../middleware')


router.post('/', auth, orderController.createOrder)
router.get('/transactions', auth, orderController.transactionHistory)
router.get('/instant-order', auth, orderController.instantOrders)



module.exports = router