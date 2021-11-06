const mongoose = require("mongoose");
const Schema = mongoose.Schema

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
  profilePicture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  }
})

module.exports = mongoose.model("Users", UsersSchema)
