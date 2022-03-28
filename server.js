const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const pool = require('./src/config/database')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

const router = require('./src/router')

pool.connect()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', router)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

process.on('uncaughtException', (err) => { console.error("Database connection issue : ", err.message) })