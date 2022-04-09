const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const pool = require('./src/config/database')
var cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

const router = require('./src/router')

pool.connect()

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', router)
app.use(cors())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(function (req, res, next) {
  res.status(400).json({ status: 400, message: "Unauthorized" });
  return;
})


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

process.on('uncaughtException', (err) => { console.error("Database connection issue : ", err.message) })