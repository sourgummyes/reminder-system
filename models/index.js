const mongoose = require('mongoose')

const userSchema = require('./user')
const reminderSchema = require('./reminders')


const User = mongoose.model('User', userSchema)
const Reminder = mongoose.model('Reminder', reminderSchema)


module.exports = {
    User,
    Reminder
  }