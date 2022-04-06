const con = require('../../config/database')
const fetch = require('node-fetch')

const getSpots = async (req, res) => {

    let response;
    try{
        const url = `${process.env.FTX_API}/markets`
        const getMarkets = await fetch(url, (data) => {
            return data
        })

        const results = await getMarkets.json()
        if(!results.success) throw Error(results.error)


        const getResult = new Promise((resolve, reject) => {
            const query = `SELECT name, active as is_active FROM spots`
            con.query(query, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })

        const getSpotsDetails = await getResult
        const mapResults = results.result.map(spot => {
             const filterData = getSpotsDetails.rows.find(spotFromDB => spotFromDB.name === spot.name)
             const spotMap = { name: spot.name, is_active: true}
             return filterData || spotMap
        })

        response = {
            status: 200,
            data: mapResults
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

const updateSpots = async (req, res) => {
    let response;
    try{
        const { name, is_active } = req.body
        if(typeof is_active !== 'boolean') throw Error('is_active should be boolean')

        const query = `INSERT INTO spots (name, active) VALUES ('${name}', ${is_active}) ON CONFLICT (name) DO UPDATE SET active = ${is_active}`
        const getResult = new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if(err) reject(err)
                resolve(result.rowCount)
            })
        })
        
        const getRowUpdate = await getResult
        if(getRowUpdate === 0) throw Error('Invalid name')

        response = {
            status: 200,
            message: "Update Success"
        }

    }catch(err){
        console.error(err.message)
        response = {
            status: 400,
            message: `Server Error: ${err.message}`,
        }
    }finally{
        res.status(response.status).json(response)
    }
}


module.exports = {
    getSpots,
    updateSpots
}