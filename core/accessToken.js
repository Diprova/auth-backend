const jwt = require('jsonwebtoken')


const authentication = (user, res) => {
    const accessToken = jwt.sign({
        'email': user.email
    },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1m' })

    const refreshToken = jwt.sign({
        'email': user.email
    },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: '1d' })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return accessToken
}


const refresh = (cookie, db) => {
    if (!cookie?.jwt) return res.status(401).json({ message: 'Unauthorized!' })

    jwt.verify(jwt, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })

        const authenticatedUser = await db.collection('User').findOne({ email: decoded.email })

        if (!authenticatedUser) return res.status(401).send({ message: 'Unauthorized!' })
    })

    const accessToken = jwt.sign({
        'email': user.email
    },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '10s' })

    res.json({ accessToken })
}




module.exports = { authentication, refresh }