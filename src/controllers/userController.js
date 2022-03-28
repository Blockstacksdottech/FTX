const con = require('../config/database')
const { verifyAccessToken } = require('../utils')

const profile = (req, res) => {

    const { authorization } = req.headers

    const token = authorization.split(' ')[1]
    const emailData = verifyAccessToken(token)

    con.query(`SELECT * FROM users WHERE email = '${emailData}' `, (err, results) => {
      const { email, firstname, lastname } = results.rows[0]

      res.status(200).json({
        status: 200,
        data: {
          first_name: firstname,
          last_name: lastname,
          email, 
        }
      })
    })
}


module.exports = {
  profile,

}