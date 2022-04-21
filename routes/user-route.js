const express = require('express')
const router = express.Router()

const {Register, Users, Login,LoginbyToken}  = require('../controller/user-controller')



router.post('/register',Register)
router.post('/login',Login)
router.get('/all-users',Users)
router.post('/loginbytoken',LoginbyToken)

module.exports = router