const con = require('../config/database')
const fetch = require('node-fetch')

const spotMarket = async (req, res) => {

  let response;
  try{
    const url = `${process.env.FTX_API}/markets`
    const getMarkets = await fetch(url, (data) => {
      return data
    })

    const results = await getMarkets.json()
    
    if(!results.success) throw Error(results.error)
    
    response = {
      status: 200,
      data: results.result
    }
  }catch(err){
    console.error(err.message)
    response = {
      status: 400,
      message: `Server Error`,
      data: []
    }
  }finally{
    res.status(response.status).json(response)
  }
}

module.exports = {
  spotMarket,
}