const mongoose = require("mongoose");

const PurchasesSchema = mongoose.Schema({

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
  datePurchased: {
    type: Date,
    required: true
  },
  listedPrice: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model("Purchases", PurchasesSchema)
