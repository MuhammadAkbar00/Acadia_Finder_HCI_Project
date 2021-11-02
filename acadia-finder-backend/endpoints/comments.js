const express = require('express')
const cors = require('cors')
const router = express.Router()
const Comments = require('../models/comments')
const Books = require('../models/books')

// Get all comments
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Comments")
    try {
        const comments = await Comments.find()
        res.send(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all comments for specific book
router.get('/for/:id', cors(), async (req, res) => {
    console.log("Getting all Comments for book " + req.params.id)
    try {
        const comments = await Comments.find({"book": req.params.id})
        res.send(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete one
router.delete('/:id', getComment, async (req, res) => {
  try {
      await res.comment.remove()
      res.json({ message: "Deleted Comment" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
    Comments.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Comments" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getComment(req, res, next) {

  let comment
  try {
    comment = await Comments.findById(req.params.id)
      if (comment == null) {
          return res.status(404).json({ message: "Cannot find Comment" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.comment = comment
  next()
}


module.exports = router
