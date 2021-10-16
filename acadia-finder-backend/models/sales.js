const mongoose = require("mongoose");

const SalesSchema = mongoose.Schema({
  
  sellerId: {
    type: String,
    required: true
  },
  purchaserId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  dateSold: {
    type: String,
    required: true
  },
  listedPrice: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model("Sales", SalesSchema)
