const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({

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
    type: String,
    required: false,
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
  },
  forSale: {
    type: Boolean,
  },
  holding: {
    type: Boolean,
  },
  availability: {
    type: Boolean
  },
  sold: {
    type: Boolean
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]
})

module.exports = mongoose.model("Books", BooksSchema)
