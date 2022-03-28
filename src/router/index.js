const express = require('express');
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')


const router = express.Router();

router.use('/', authRoutes)
router.use('/', userRoutes)


module.exports = router