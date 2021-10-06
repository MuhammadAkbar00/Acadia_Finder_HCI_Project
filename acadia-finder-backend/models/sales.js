const mongoose = require("mongoose");

const SalesSchema = mongoose.Schema({
  salesId: {
    type: String,
    required: true
  },
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
    type: Date,
    required: true
  },
  listedPrice: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model("Sales", SalesSchema)
