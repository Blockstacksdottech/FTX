const { queryDatabase } = require('../../utils')
const fetch = require('node-fetch')

const generateReport = async (req, res) => {

    let response;

    try{
        const { user } = req.query

        const where = user !== 'all' ? `WHERE email = '${user}'` : '';
        const query = `SELECT * FROM reports ${where} ORDER BY id DESC`
        const getResults = await queryDatabase(query)

        response = {
            status: 200,
            data: getResults
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
    generateReport,
}