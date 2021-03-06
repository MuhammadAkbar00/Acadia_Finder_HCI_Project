const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AdminSchema = mongoose.Schema({
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
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Admin", AdminSchema)
