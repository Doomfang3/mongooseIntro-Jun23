const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model('User', userSchema)

module.exports = User
