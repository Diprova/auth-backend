const { MongoClient } = require("mongodb")
const bcrypt = require("bcrypt")
const db = new MongoClient(`${process.env.MONGO_URI}`).db('Authentication')
const saltRounds = 10

const createUserCore = async (req) => {
    const { name, email, password } = req
    let hashedPassword
    if (undefined !== password) {
        hashedPassword = await bcrypt.hash(`${req.password}`, saltRounds)
    }
    const userDetails = { name, email, password: hashedPassword }
    const result = await db.collection('User').insertOne(userDetails)
    return result
}

const getUser = async (req) => {
    const { email, password } = req
    const query = { email: email }
    const user = await db.collection('User').findOne(query)
    const checkpwd = await bcrypt.compare(password, user.password)
    return checkpwd
}

module.exports = { createUserCore, getUser }