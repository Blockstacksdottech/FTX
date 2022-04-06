const con = require('../config/database')
const { generateAccessToken, createReport } = require('../utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req, res) => {
    const { email, password, role } = req.body 

    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const setRoles = role ? role : 'trader'

    const query = `INSERT INTO users (email, password, role) values ('${email}','${hashPassword}', '${setRoles}');`

    con.query(query, async (error, results) => {
      let status = 201
      let message = "Success"
      if (error) {
        status = 404;
        message = "Email already exists!"
      }

      if(!error) await createReport(email, 'registered')
      res.status(status).json({
        status,
        message,
      })
    })
}



const login = (req, res) => {

  const { email, password } = req.body 

  const query = `SELECT * FROM users WHERE email = '${email}'`
    con.query(query, async (error, results) => {
      const passwordHash = results?.rows[0]?.password || ''
      const role = results?.rows[0]?.role
      const active = results?.rows[0]?.active

      let response = {
        status: 200,
        message: "Success"
      }

      const compare = bcrypt.compareSync(password, passwordHash)
      switch (true) {
        case !compare || results.rows.length === 0:
          response = {
            status: 404,
            message: "Invalid credentials"
          }
          break;
      
        case active === false:
          response = {
            status: 404,
            message: "Your account is locked, please contact the administrator."
          }
          break;
        default:
          response['token'] = generateAccessToken(email, role)
          await createReport(email, 'login')
      }
      res.status(response.status).json(response)
    })
}

module.exports = {
  register,
  login
}