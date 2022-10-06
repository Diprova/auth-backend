const { MongoClient } = require("mongodb")
const db = new MongoClient(`${process.env.MONGO_URI}`).db('Authentication')
const bcrypt = require("bcrypt")
const accessToken = require('./accessToken');

const login = async (req, res) => {
    const { email, password } = req
    const query = { email: email }
    const user = await db.collection('User').findOne(query)
    const checkpwd = await bcrypt.compare(password, user.password)
    const authentication = checkpwd ? { token: accessToken.authentication(user, res), userId: user._id } : checkpwd
    return authentication
}

const refresh = (req) => {
    const cookie = req.cookies
    const authentication = accessToken.refresh(cookie, db)
    return authentication
}

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: "Cookie Cleared" })
}

module.exports = { login, refresh, logout }