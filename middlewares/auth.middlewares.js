const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const jwtVerify = promisify(jwt.verify)

const authentication = (req, res, next) => {
   const tmp = req.header('Authentication').split(' ')
   const token = tmp[1]
   if (!token) return res.status(403).json({ message: "Từ chối truy cập" })
   jwtVerify(token, process.env.SECRET_KEY)
      .then(decoded => {
         req.user = decoded
         return next()
      })
      .catch(err => res.status(500).json(err))
}
const authorization = (req, res, next) => {
   if (req.user.role === 'administrator') return next()
   return res.status(403).json({ message: "Bạn không đủ quyền truy cập" })
}
module.exports = { authentication, authorization }