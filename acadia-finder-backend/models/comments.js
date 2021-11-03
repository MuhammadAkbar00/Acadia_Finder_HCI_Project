const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // each comment can only relates to one blog, so it's not in array
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }
})

module.exports = mongoose.model('Comments', CommentsSchema);