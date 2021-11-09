const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  noteFiles: [],
  datePosted: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
}, {timestamps: true})

module.exports = mongoose.model("Notes", NotesSchema)
