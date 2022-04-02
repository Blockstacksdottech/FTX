const express = require('express');
const router = express.Router();
const { historicalController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/', auth, historicalController.timestamp)
router.get('/live', auth, historicalController.ohcl)



module.exports = router