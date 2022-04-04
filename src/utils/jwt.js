const jwt = require('jsonwebtoken')


const generateAccessToken = (email, role) => {
    const expire_in_mins = process.env.JWT_ACCESS_EXPIRATION_MINUTES 
    const secret_key = process.env.JWT_SECRET

    return jwt.sign({data: { email, role }, exp: Math.floor(Date.now() / 1000) + (expire_in_mins * 60)}, secret_key );
}

const verifyAccessToken = (token) => {
    const secret_key = process.env.JWT_SECRET
    const cleanToken = token.split(' ')[1]
    jwt.verify(cleanToken,  secret_key, function(err, decoded) {
        data = decoded?.data
      });
    return data; 
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
    
}