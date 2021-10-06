const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false,
  },
  bookImage: {
    type: File,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  rentPrice: {
    type: Number,
    required: true
  },
  forRent: {
    type: Boolean,
    required: true
  },
  forSale: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("Books", BooksSchema)
