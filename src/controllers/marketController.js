const con = require('../config/database')
const fetch = require('node-fetch')
const { filterResults } = require('../services/dashboardService')

const market = async (req, res) => {

  const { type } = req.params
  let response;


  try{

    const url = `${process.env.FTX_API}/markets`

    const getMarkets = await fetch(url, (data) => {
      return data
    })

    const results = await getMarkets.json()
    if(!results.success) throw Error(results.error)
    let { result } = results


    result = await filterResults(result, type)

    const sortResults = result.sort((a, b) => b.volumeUsd24h - a.volumeUsd24h)

    response = {
      status: 200,
      data: sortResults
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


const tradeMarket = async (req, res) => {
  const { trade } = req.query
  let response;
  try{
    
    const url = `${process.env.FTX_API}/markets/${trade}`
    const getTrade = await fetch(url, (data) => {
      return data
    })

    const results = await getTrade.json()
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
    return;
  }
}


const orderBook = async (req, res) => {
  const { trade } = req.query
  let response;
  try{

    const url = `${process.env.FTX_API}/markets/${trade}/orderbook?depth=20`
    const getOrderBook = await fetch(url, (data) => {
      return data
    })

    const results = await getOrderBook.json()
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
    return;
  }
}

module.exports = {
  market,
  tradeMarket,
  orderBook
}