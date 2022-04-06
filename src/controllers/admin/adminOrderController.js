const { queryDatabase, getUserDetails, verifyAccessToken } = require('../../utils')


const createInstantOrder = async (req, res) => {
    let response;
    try{
        const { type, size, side } = req.body
        if( !type || !size || !side ) throw Error('Invalid input')
        const query = `INSERT INTO instant_orders (type, size, side) VALUES ('${type}', ${size}, '${side}') `
        await queryDatabase(query)

        response = {
            status: 200,
            data: `Created Instant order`
        }
    }catch(err){
      console.error(err.message)
      response = {
        status: 400,
        message: `Server Error : ${err.message}` ,
        data: []
      }
    }finally{
      res.status(response?.status).json(response)
    }

}

const updateInstantOrder = async (req, res) => {
    let response;
    try{
        const { id, type, size, side, active } = req.body
        if( !id || !type || !size || !side  || typeof active !== 'boolean') throw Error(`Invalid input`)


        const query = `UPDATE 
                        instant_orders 
                       SET 
                        type = '${type}',
                        size = ${size},
                        side = '${side}',
                        active = ${active}
                       WHERE id = ${id}`
        await queryDatabase(query)
        response = {
            status: 200,
            data: `Update Instant order id: ${id}`
        }
    }catch(err){
      console.error(err.message)
      response = {
        status: 400,
        message: `Server Error : ${err.message}` ,
        data: []
      }
    }finally{
      res.status(response?.status).json(response)
    }

}

const deleteInstantOrder = async (req, res) => {

    let response;
    try{
        const { id } = req.params
        const query = `DELETE FROM instant_orders WHERE id = ${id}`
        await queryDatabase(query)

        response = {
            status: 200,
            data: `Deleted Instant order id : ${id}`
        }
    }catch(err){
      console.error(err.message)
      response = {
        status: 400,
        message: `Server Error : ${err.message}` ,
        data: []
      }
    }finally{
      res.status(response?.status).json(response)
    }

}



module.exports = {
    deleteInstantOrder,
    createInstantOrder,
    updateInstantOrder
}