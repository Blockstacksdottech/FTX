const { queryDatabase } = require('../../utils')
const fetch = require('node-fetch')

const getTokens = async (req, res) => {

    let response;

    try{
        const query = `SELECT
                            name,
                            is_active
                        FROM
                            tokens
                        `

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

const updateToken = async (req, res) => {

    let response;
    try{
        const { name, is_active } = req.body;

        if(typeof is_active !== 'boolean') throw Error("is_active should be boolean")
        const query = `INSERT INTO tokens (name, is_active) VALUES ('${name}', ${is_active}) ON CONFLICT (name) DO UPDATE SET is_active = ${is_active}`
        await queryDatabase(query)
        response = {
            status: 200,
            message: "Success."
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
    getTokens,
    updateToken
}