const { queryDatabase } = require('./common')

const createReport = (email, activity) => new Promise(async (res, rej) => {
    const query = `INSERT INTO reports (email, activity) VALUES ('${email}','${activity}')`
    queryDatabase(query, (result) => res(result)).catch(rej)
})

module.exports = {
    createReport,
}