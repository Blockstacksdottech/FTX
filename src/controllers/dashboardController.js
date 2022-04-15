const fetch = require('node-fetch');
const { filterResults, sortResults, overview } = require('../services/dashboardService')

const mobile = async (req, res) => {
  let response;
  const { type, sort } = req.query
  try{
    const url = `${process.env.FTX_API}/markets`
    const getAllCoins = await fetch(url)

    const results = await getAllCoins.json()
    if(!results.success) throw Error(results.error)

    const { result } = results
    const overviewResult = overview(result)

    const filters = await filterResults(result, type)
    const rank_list = sortResults(filters, sort)

    response = {
      status: 200,
      data: {
        overview: overviewResult,
        rank_list
      },
     
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
  mobile,

}