const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers')
const { auth } = require('../middleware')


router.get('/', auth, usersController.getUsers)
router.post('/', usersController.createUser)



module.exports = router