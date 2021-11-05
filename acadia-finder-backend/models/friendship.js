const mongoose = require("mongoose");
const Schema = mongoose.Schema

const FriendshipSchema = new Schema({
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  incomingRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  outgoingRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  }, {timestamps: true})
  module.exports = mongoose.model('Friendsip', FriendshipSchema)
