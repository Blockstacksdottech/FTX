const con = require('../config/database')
const { generateAccessToken } = require('../utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req, res) => {
    const { email, password } = req.body 

    const hashPassword = bcrypt.hashSync(password, saltRounds);

    const query = `INSERT INTO users (email, password) values ('${email}','${hashPassword}');`

    con.query(query, (error, results) => {
      let status = 201
      let message = "Success"
      if (error) {
        status = 404;
        message = "Email already exists!"
      }

      res.status(status).json({
        status,
        message,
      })
    })
}



const login = (req, res) => {

  const { email, password } = req.body 

  const query = `SELECT * FROM users WHERE email = '${email}'`

    con.query(query, (error, results) => {
      const passwordHash = results?.rows[0]?.password || ''

      let response = {
        status: 200,
        message: "Success"
      }

      const compare = bcrypt.compareSync(password, passwordHash)
      
      if(!compare || results.rows.length === 0) {
        response = {
          status: 404,
          message: "Invalid credentials"
        }
      }else{
        response['token'] = generateAccessToken(password)
      }

      res.status(response.status).json(response)
    })
}

module.exports = {
  register,
  login
}