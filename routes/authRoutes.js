const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/authController')
const limiter = require('../middleware/ratelimiter')

router.get('/')
router.post('/login', limiter, AuthController.login)
router.get('/refresh', limiter, AuthController.refresh)
router.post('/logout', limiter, AuthController.logout)

module.exports = router