const fetch = require('node-fetch');
const { filterResults, sortResults, overview, overviewFutures } = require('../services/dashboardService')

const mobile = async (req, res) => {
  const host = req.headers.host
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
    const rank_list = sortResults(filters, sort, host)

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


const web = async (req, res) => {
  let response;
  const { type, sort } = req.query
  const host = req.headers.host

  try{
    const vol24hUrl = `${process.env.FTX_API}/stats/24h_volume`
    const vol30dUrl = `${process.env.FTX_API}/stats/30d_volume`
    const borrowSummaryUrl = `${process.env.FTX_API}/spot_margin/history`
    const futuresUrl = `${process.env.FTX_API}/futures`

    const vol24h = await fetch(vol24hUrl)
    const vol30d = await fetch(vol30dUrl)
    const borrowSummary = await fetch(borrowSummaryUrl)
    const future = await fetch(futuresUrl)



    const results24h = await vol24h.json()
    const results30d = await vol30d.json()
    const resultsBorrowSummary = await borrowSummary.json()
    const resultsFuture = await future.json()


    if(!results24h.success) throw Error(results24h.error)
    if(!results30d.success) throw Error(results30d.error)
    if(!resultsBorrowSummary.success) throw Error(resultsBorrowSummary.error)
    if(!resultsFuture.success) throw Error(resultsFuture.error)

    const result24h = results24h.result
    const result30d = results30d.result
    const resultBorrowSummary = resultsBorrowSummary.result
    const resultFuture = resultsFuture.result

    const { spot, derivatives } = result24h
    const totalVolume = spot + derivatives

    const totalLend = resultBorrowSummary.map(({ size }) => size ).reduce((partialSum, a) => partialSum + a, 0)

    const futures = overviewFutures(resultFuture, host)

    response = {
      status: 200,
      data: {
        statistics: [
          {
            "24hVol": totalVolume || 0,
            "30dVol": Number(result30d) || 0,
            "24hLend": totalLend || 0,
          }
        ],
        futures
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
  web
}