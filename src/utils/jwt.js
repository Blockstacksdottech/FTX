const jwt = require('jsonwebtoken')


const generateAccessToken = (email) => {
    const expire_in_mins = process.env.JWT_ACCESS_EXPIRATION_MINUTES 
    const secret_key = process.env.JWT_SECRET

    return jwt.sign({data: email, exp: Math.floor(Date.now() / 1000) + (expire_in_mins * 60)}, secret_key );
}

const verifyAccessToken = (token) => {
    const secret_key = process.env.JWT_SECRET
    let email;
    jwt.verify(token,  secret_key, function(err, decoded) {
        email = decoded.data
      });
    return email; 
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
    
}