const { Schema, model } = require('mongoose')

const question = require('./question')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

module.exports = model('User', userSchema)
