const con = require('../config/database')

const queryDatabase = (query, callback) => new Promise((res, rej) => {
    con.query(query, (err, result) => {
        if(err) rej(false);
        if(callback) callback(result);
        res(result.rows);
    })
})

const getUserDetails = (email) => new Promise(async (res, rej) => {
    const query = `SELECT id, email, firstname, lastname FROM users WHERE email = '${email}'`
    const callback = (result) => {
        const [ userData ] = result.rows
        res(userData)
    }
    queryDatabase(query, callback).catch(rej)
})

const getFiats = () => new Promise(async (res, rej) => {
    const query = `SELECT name FROM fiats`
    const callback = (result) => {
        res(result.rows)
    }
    queryDatabase(query, callback).catch(rej)
})

module.exports = {
    queryDatabase,
    getUserDetails,
    getFiats
}