const { queryDatabase } = require('../../utils')

const users = async (req, res) => {

    let response;

    try{
        const query = `SELECT id, email, firstname, lastname, role, active FROM users`
        const result = await queryDatabase(query)

        response = {
            status: 200,
            data: result
        }
    }catch(err){
      console.error(err.message)
      response = {
        status: 400,
        message: `Server Error : ${err.message}` ,
        data: []
      }
    }finally{
      res.status(response.status).json(response)
    }

}

const setStatus = async (req, res) => {
  let response;

  try{
      const { email, active } = req.body
      if(!email || typeof active !== 'boolean') throw Error('Invalid Input')
      const query = `UPDATE users SET active = ${active} WHERE email = '${email}'`
      await queryDatabase(query)

      response = {
          status: 200,
          data: "User update status"
      }
  }catch(err){
    console.error(err.message)
    response = {
      status: 400,
      message: `Server Error : ${err.message}` ,
      data: []
    }
  }finally{
    res.status(response.status).json(response)
  }
}



module.exports = {
    users,
    setStatus
}