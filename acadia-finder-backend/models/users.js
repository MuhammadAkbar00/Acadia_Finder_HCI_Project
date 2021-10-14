const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Users", UsersSchema)
