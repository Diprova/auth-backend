const { MongoClient } = require("mongodb")
const mongodb = require('mongodb')
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

const submissionCore = async (req, userId) => {
    const { name, occupation, projects, skills, image } = req
    const query = { _id: new mongodb.ObjectID(userId.toString()) }
    let values = {
        $set: {
            'name': name, 'occupation': occupation, 'projects': projects, 'skills': skills, 'image': image
        }
    }
    const result = await db.collection('User').updateOne(query, values, { new: true })
    return result
}

const getSubmission = async (userId) => {
    const query = { _id: new mongodb.ObjectID(userId.toString()) }
    const result = await db.collection('User').findOne(query)
    return result
}


module.exports = { createUserCore, submissionCore, getSubmission }