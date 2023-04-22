const { register, login,test } = require('../controllers/authCotroller')
const { private } = require('../middlewares/verifyToken')
const user = require('../models/userModel')
const express = require('express')
const router = express.Router()

router.post('/register' , register )
router.post('/login' , login )
router.get('/test' ,private, test )

module.exports=router