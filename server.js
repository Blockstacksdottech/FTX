const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

const router = require('./src/router/index')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', router)


app.get('/', (req, res) => {
    res.send({"test":"data"})
})







app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})