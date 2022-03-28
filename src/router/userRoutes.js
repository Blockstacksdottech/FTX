const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/profile', auth, usersController.profile)



module.exports = router