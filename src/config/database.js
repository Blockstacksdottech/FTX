const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized : false,
  }
})

module.exports = pool