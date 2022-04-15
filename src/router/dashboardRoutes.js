const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers')
const { auth } = require('../middleware')

router.get('/mobile', auth, dashboardController.mobile)

module.exports = router