const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/authController')
const limiter = require('../middleware/ratelimiter')
const UserController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyjwt');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/')
router.post('/login', limiter, AuthController.login)
router.get('/refresh', limiter, AuthController.refresh)
router.post('/logout', limiter, AuthController.logout)
router.post('/createUser', limiter, UserController.createUser)
router.post('/submission', limiter, verifyJWT, UserController.submission)
router.get('/getSubmission', limiter, verifyJWT, UserController.submissionDetails)

module.exports = router