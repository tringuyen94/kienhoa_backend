const mongosee = require('mongoose')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')
const genSalt = promisify(bcrypt.genSalt)
const hashing = promisify(bcrypt.hash)

const UserSchema = new mongosee.Schema({
   username: { type: String, unique: true, trim: true, lowercase: true, required: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   password: { type: String, min: 6, max: 20, required: true },
   avatar: { type: String },
   role: { type: String, enum: ['administrator', 'moderator'], default: "moderator" }
})
UserSchema.pre('save', function (next) {
   const user = this
   if (!user.isModified('password')) return next()
   genSalt(2)
      .then(salt => hashing(user.password, salt))
      .then(hashedPassword => {
         user.password = hashedPassword
         return next()
      })
      .catch(err => console.log(err))
})
const User = mongosee.model('User', UserSchema, 'User')

module.exports = User