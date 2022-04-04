const express = require('express');
const router = express.Router();
const { spotController } = require('../controllers')
const { auth } = require('../middleware')

/** SPOTS */
router.get('/spots', auth, spotController.getSpots)
router.post('/spots', auth, spotController.updateSpots)




module.exports = router