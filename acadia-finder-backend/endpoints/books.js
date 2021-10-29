const express = require('express')
const cors = require('cors')
const router = express.Router()
const Book = require('../models/books')

// Get all books
router.get('/', cors(), async (req, res) => {
    console.log("Getting all books")
    try {
        const books = await Book.find()
        res.send(books)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    courseId: req.body.courseId,
    edition: req.body.edition,
    author: req.body.author,
    bookImage: req.body.bookImage,
    userId: req.body.userId,
    buyPrice: req.body.buyPrice,
    rentPrice: req.body.rentPrice,
    forRent: req.body.forRent,
    forSale: req.body.forSale
  })
  try {
    const newBook = await book.save()
      res.status(201).json(newBook)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getBook, async (req, res) => {
  try {
      await res.book.remove()
      res.json({ message: "Deleted Book" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Book.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Books" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getBook(req, res, next) {

  let book
  try {
      book = await Book.findById(req.params.id)
      if (book == null) {
          return res.status(404).json({ message: "Cannot find Book" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.book = book
  next()
}


module.exports = router
