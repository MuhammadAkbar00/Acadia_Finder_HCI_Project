const mongoose = require("mongoose");

const HoldingsSchema = mongoose.Schema({
  holdingId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  forRent: {
    type: Boolean,
    required: true
  },
  forPurchase: {
    type: Boolean,
    required: true
  },
})

module.exports = mongoose.model("Holdings", HoldingsSchema)
