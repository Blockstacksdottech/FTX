const fetch = require('node-fetch');
const { verifyAccessToken, queryDatabase } = require('../utils')

const coins = async (req, res) => {
  let response;
  const { authorization } = req.headers
  const { email } = verifyAccessToken(authorization)

  try{

    const query = `SELECT 
                    W.balance,
                    W.currency
                  FROM users U
                  RIGHT JOIN wallet W ON U.id = W.user_id
                  WHERE U.email = '${email}'`

    const coinBalance = await queryDatabase(query);

    const url = `${process.env.FTX_API}/wallet/coins`
    const getAllCoins = await fetch(url)

    const results = await getAllCoins.json()
    if(!results.success) throw Error(results.error)

    const mapResults = results.result.filter(({hidden}) => !hidden).map(coin => {
      const mapCoin = coinBalance.find(dbCoin => dbCoin.currency === coin.id)
      return {
        id: coin.id,
        name: coin.name,
        balance: mapCoin?.balance || 0
      }
    })

    response = {
      status: 200,
      data: mapResults,
     
    }
  }catch(err){
    console.error(err.message)
    response = {
      status: 400,
      message: `Server Error: ${err.message}`,
      data: []
    }
  }finally{
    res.status(response.status).json(response)
    return;
  }
}


module.exports = {
  coins,

}