const { queryDatabase } = require('../../utils')
const fetch = require('node-fetch')

const wallets = async (req, res) => {

    let response;

    try{
        const query = `SELECT
                            U.email,
                            W.balance,
                            W.currency
                        FROM
                            users U
                        LEFT JOIN wallet W ON U.id = W.user_id 
                        WHERE U.role = 'trader'`

        const result = await queryDatabase(query)
        const removeDuplicateData = new Set(result.map(({ email }) => email))
        const newArray = [...removeDuplicateData]

        const mapResult = newArray.map(email => {
            return {
                email,
                wallets: result.filter( wallet => wallet.email === email ).map(({ balance, currency }) => ({ balance, currency }))
            }
        })


        response = {
            status: 200,
            data: mapResult
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
    wallets,
}