const User = require('../../../models/user.models')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const comparePw = promisify(bcrypt.compare)
const jwt = require('jsonwebtoken')
const jwtSign = promisify(jwt.sign)
const createUser = (req, res, next) => {
   const avatar = "avatar/avatar_default.png"
   const { username, firstName, lastName, password } = req.body
   User.findOne({ username })
      .then(user => {
         if (user) return Promise.reject({ status: 409, message: "Đã tồn tại tài khoản" })
         let _user = new User({ username, firstName, lastName, password, avatar })
         return _user.save()
      })
      .then(newUser => res.status(201).json(newUser))
      .catch(err => {
         if (err.status) return res.status(err.status).json({ message: err.message })
         return res.status(500).json({ err, message: "Thất bại" })
      })
}
const userLogin = (req, res, next) => {
   const { username, password } = req.body
   User.findOne({ username })
      .then(user => {
         if (!user) return Promise.reject({ status: 400, message: "Người dùng không tồn tại" })
         return Promise.all([comparePw(password, user.password), user])
      })
      .then(result => {
         const isMatch = result[0]
         if (!isMatch) return Promise.reject({ status: 400, message: "Mật khẩu không đúng" })
         const payload = {
            _id: result[1]._id,
            username: result[1].username,
            firstName: result[1].firstName,
            lastName: result[1].lastName,
            avatar: result[1].avatar,
            role: result[1].role
         }
         return jwtSign(payload, process.env.SECRET_KEY)
      })
      .then(token => res.status(200).json({ token, message: "Đăng nhập thành công" }))
      .catch(err => {
         if (err.status) return res.status(err.status).json({ message: err.message })
         return res.status(500).json({ err, message: "Đăng nhập thất bại" })
      })
}
const getUsers = (req, res, next) => {
   User.find()
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({ err, message: "Lấy thông tin thất bại" }))
}

const updateInfo = (req, res, next) => {
   const userId = req.user._id
   const { firstName, lastName } = req.body
   User.findByIdAndUpdate(userId, { firstName, lastName }, { new: true })
      .then(updated => res.status(200).json({ updated, message: "Cập nhật thành công" }))
      .catch(err => res.status(500).json({ err, message: "Cập nhật thất bại" }))
}
const updateAvatar = (req, res, next) => {
   const newAvatar = req.file.path.subString(8)
   const userId = req.user._id
   User.findByIdAndUpdate(userId, { avatar: newAvatar }, { new: true })
      .then(updated => res.status(200).json({ updated, message: 'Cập nhật thành công' }))
      .catch(err => res.status(500).json({ err, message: "Cập nhật thất bại" }))
}
const updatePassword = (req, res, next) => {
   const userId = req.user._id
   const { newPassword } = req.body
   User.findOneAndUpdate({ _id: userId }, { password: newPassword }, { new: true })
      .then(updated => res.status(200).json({ password: updated }, "Cập nhật thành công"))
      .catch(err => res.status(500).json({ err, message: "Cập nhật thất bại" }))
}
module.exports = { createUser, userLogin, getUsers, updateInfo, updatePassword, updateAvatar }