const jwt = require('jsonwebtoken')


function generateAccessToken(username) {
    const expire_in_mins = process.env.JWT_ACCESS_EXPIRATION_MINUTES 
    const secret_key = process.env.JWT_SECRET

    return jwt.sign({data: username, exp: Math.floor(Date.now() / 1000) + (expire_in_mins * 60)}, secret_key );
}

module.exports = {
    generateAccessToken
}