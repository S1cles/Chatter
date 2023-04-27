const { register, login, upload, getAllUsers } = require('../controllers/authCotroller')
const { private } = require('../middlewares/verifyToken')
const user = require('../models/userModel')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/getAllUsers', private, getAllUsers)
router.post('/upload',private, upload)

module.exports = router