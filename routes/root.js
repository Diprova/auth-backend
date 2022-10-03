const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/userController');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.post('/createUser', UserController.createUser)
router.post('/getUser', UserController.getUser)

module.exports = router