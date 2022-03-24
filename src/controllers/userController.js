const con = require('../config/database')
const { generateAccessToken } = require('../utils')

const getUsers = (req, res) => {
    con.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
  const { email, password } = req.body

  console.log(req.body)
  res.status(200).json(generateAccessToken(email))
}

module.exports = {
    getUsers,
    createUser
}