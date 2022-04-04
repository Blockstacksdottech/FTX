const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(404).json({ status: 404, message: "Unauthorized" })
    if(req.baseUrl === '/admin' && user?.data?.role !== 'admin') return res.status(404).json({ status: 404, message: "Unauthorized" })

    req.user = user
    next()
  })
}

module.exports = auth