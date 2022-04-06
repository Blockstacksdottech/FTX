const { queryDatabase, getUserDetails, verifyAccessToken, createReport } = require('../utils')
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

    await createReport(email, `${side} order`)
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


const transactionHistory = async (req, res) => {
  let response;
  try{

    const { authorization } = req.headers
    const { email } = verifyAccessToken(authorization)
    
    const query = `SELECT 
                    O.id,
                    O.market,
                    O.side,
                    O.status,
                    O.price,
                    O.size,
                    O.date_created
                  FROM orders O
                  RIGHT JOIN users U ON O.user_id = U.id
                  WHERE U.email = '${email}'
                  ORDER BY O.date_created desc;`
    const getResult = await queryDatabase(query)

    response = {
      status: 200,
      data: getResult
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



const instantOrders = async (req, res) => {
  let response;
  try{

    const query = `SELECT type, size, side FROM instant_orders`
    const getResult = await queryDatabase(query)

    response = {
      status: 200,
      data: getResult
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
  transactionHistory,
  instantOrders
}