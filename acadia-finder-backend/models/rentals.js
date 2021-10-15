const mongoose = require("mongoose");

const RentalsSchema = mongoose.Schema({
  renterId: {
    type: String,
    required: true
  },
  renteeId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  rentedDate: {
    type: String,
    required: true
  },
  returnDate: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Rentals", RentalsSchema)
