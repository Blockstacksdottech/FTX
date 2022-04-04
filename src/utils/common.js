const con = require('../config/database')

const queryDatabase = (query, callback) => new Promise((res, rej) => {
    con.query(query, (err, result) => {
        if(err) rej(false);
        if(callback) callback(result);
        res(result.rows);
    })
})

module.exports = {
    queryDatabase
}