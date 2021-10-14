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
router.delete('/:id', getItem, async (req, res) => {
  try {
      await res.item.remove()
      res.json({ message: "Deleted item" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Item.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all item" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getItem(req, res, next) {

  let item
  try {
      item = await Book.findById(req.params.id)
      if (item == null) {
          return res.status(404).json({ message: "Cannot find item" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.item = item
  next()
}


module.exports = router
