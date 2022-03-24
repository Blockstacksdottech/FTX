const Pool = require('pg').Pool
const connection = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
})

module.exports = connection