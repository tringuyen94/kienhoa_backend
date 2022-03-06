const express = require('express')
const AuthController = require('./auth.controller')
const uploadImage = require('../../../middlewares/upload.middlewares')
const { authorization, authentication } = require('../../../middlewares/auth.middlewares')

const router = express.Router()
router.post('/login', AuthController.userLogin)
router.post('/create-user', uploadImage('avatar'), AuthController.createUser)
router.get('/get-users', authentication, authorization, AuthController.getUsers)
router.put('/update-info', authentication, AuthController.updateInfo)
router.put('/update-avatar', authentication, uploadImage('avatar'), AuthController.updateAvatar)
router.put('/update-password', authentication, AuthController.updatePassword)
module.exports = router