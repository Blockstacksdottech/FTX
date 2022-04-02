const con = require('../config/database')
const fetch = require('node-fetch')

const timestamp = async (req, res) => {

  let response;
  const { start_time, end_time, resolution } = req.query

  try{
    /** 20 Steps back */
    const getDataOffset = Number(resolution * 20)

    const endTime = new Date(end_time * 1000)

    const startTime = new Date(endTime - getDataOffset * 1000)

    const timestampEndTime = Number(end_time || endTime.getTime() / 1000)
    const timestampStartTime = Number(start_time || startTime.getTime() / 1000)


    const url = `${process.env.FTX_API}/markets/1INCH-PERP/candles?resolution=${Number(resolution)}&start_time=${timestampStartTime}&end_time=${timestampEndTime}`
    const getHistoricalByTimestamp = await fetch(url, (data) => {
          return data
        })

    const results = await getHistoricalByTimestamp.json()
    if(!results.success) throw Error(results.error)

    response = {
      status: 200,
      endTime,
      startTime,
      data: results.result,
     
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


const ohcl = async (req, res) => {
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

module.exports = {
  timestamp,
  ohcl
}