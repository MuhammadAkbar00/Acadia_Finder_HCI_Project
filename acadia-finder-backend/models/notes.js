const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  noteId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  noteFile: {
    type: File,
    required: true
  },
  datePosted: {
    type: Date,
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
})

module.exports = mongoose.model("Notes", NotesSchema)
