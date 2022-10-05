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

module.exports = { createUser }