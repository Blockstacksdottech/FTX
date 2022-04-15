const express = require('express');
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const marketRoutes = require('./marketRoutes')
const historicalRoutes = require('./historicalRoutes')
const adminRoutes = require('./adminRoutes')
const walletRoutes = require('./walletRoutes')
const orderRoutes = require('./orderRoutes')
const dashboardRoutes = require('./dashboardRoutes')



const router = express.Router();

router.use('/admin', adminRoutes)

router.use('/', authRoutes)
router.use('/', userRoutes)
router.use('/market', marketRoutes)
router.use('/history', historicalRoutes)
router.use('/wallet', walletRoutes)
router.use('/orders', orderRoutes)
router.use('/dashboard', dashboardRoutes)


module.exports = router