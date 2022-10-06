const UserCore = require('../core/user')

const createUser = async (req, res) => {
    if (req.body === undefined) {
        return undefined
    }
    const userDetail = await UserCore.createUserCore(req.body)
    if (!userDetail) {
        res.status(404).send({ success: false, error: { message: 'No Data Found' } })
    } else {
        res.status(200).send({ success: true, info: { message: 'Successfully User Created !' } })
    }
}

const submission = async (req, res) => {
    if (req.body === undefined) {
        return undefined
    }
    const userId = req.headers.userid
    const submission = await UserCore.submissionCore(req.body, userId)
    if (!submission) {
        res.status(404).send({ success: false, error: { message: 'No Data Submitted' } })
    } else {
        res.status(200).send({ success: true, info: { message: 'Successfully Submitted !' } })
    }
}

const submissionDetails = async (req, res) => {
    const userId = req.headers.userid
    const submissionDetails = await UserCore.getSubmission(userId)
    if (!submissionDetails) {
        res.status(404).send({ success: false, error: { message: 'Failed to fetch Submission' } })
    } else {
        res.status(200).send({ data: submissionDetails })
    }
}

module.exports = { createUser, submission, submissionDetails }