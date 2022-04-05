const { queryDatabase, getUserDetails, verifyAccessToken } = require('../utils')
const fetch = require('node-fetch')

const createOrder = async (req, res) => {

  let response;
  try{
    const { authorization } = req.headers
    const { email } = verifyAccessToken(authorization)
    const { id } = await getUserDetails(email)

    const { 
      market, // BTC/USDT
      side, // sell or buy
      price, // 0.02342
      type, // limit or market
      size // quantity of your order
    } = req.body;

  


    const query = `INSERT INTO orders (market, side, price, type, size, user_id) VALUES ('${market}','${side}', ${price}, '${type}', ${size}, ${id});`
    await queryDatabase(query)

    const result = {
        "createdAt": new Date(),
        "message": "Order Placed."

    }

    response = {
      status: 200,
      data: result
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
  createOrder,
  tradeMarket,
  orderBook
}