const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers.accesstoken
    jwt.verify(`${token}`, process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email
            next()
        })
}

module.exports = verifyJWT