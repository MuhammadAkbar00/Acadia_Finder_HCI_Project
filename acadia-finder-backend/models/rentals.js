const mongoose = require("mongoose");

const RentalsSchema = mongoose.Schema({
  rentalId: {
    type: String,
    required: true,
  },
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
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
})

module.exports = mongoose.model("Rentals", RentalsSchema)
