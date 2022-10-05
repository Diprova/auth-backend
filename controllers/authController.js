const Auth = require('../core/auth')

const login = async (req, res) => {
    const { email, password } = req.body
    if (req.body === undefined) {
        return undefined
    }
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' })
    }
    const userDetail = await Auth.login(req.body, res)
    if (!userDetail) {
        res.status(404).send({ success: false, error: { message: 'Unauthorized!' } })
    } else {
        res.json(userDetail)
        res.status(200).send({ success: true, info: { message: 'Successfully Logged In !' } })
    }
}

const refresh = async (req, res) => {
    const refreshAuth = await Auth.refresh(req, res)
    return refreshAuth
}

const logout = async (req, res) => {
    const logout = await Auth.logout(req, res)
    return logout
}

module.exports = { login, logout, refresh }