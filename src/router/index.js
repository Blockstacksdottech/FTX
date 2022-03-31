const express = require('express');
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const marketRoutes = require('./marketRoutes')


const router = express.Router();

router.use('/', authRoutes)
router.use('/', userRoutes)
router.use('/market', marketRoutes)


module.exports = router