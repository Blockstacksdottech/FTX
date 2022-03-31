const express = require('express');
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const spotRoutes = require('./spotRoutes')


const router = express.Router();

router.use('/', authRoutes)
router.use('/', userRoutes)
router.use('/market', spotRoutes)


module.exports = router