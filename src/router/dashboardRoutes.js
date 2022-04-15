const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers')
const { auth } = require('../middleware')

router.get('/mobile', dashboardController.mobile)
router.get('/web', dashboardController.web)

module.exports = router