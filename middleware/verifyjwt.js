const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.authorization

    if (!authHeaders?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeaders.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email
            next()
        })
}

module.exports = verifyJWT