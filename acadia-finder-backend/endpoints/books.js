const express = require('express')
const cors = require('cors')
const router = express.Router()
const Book = require('../models/books')
const Comment = require('../models/comments')

const multer = require('multer');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: (req, file, cb) => {
    cb(null, './book_uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // reject file
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    return cb(new Error('message'), true)
  }
  return cb(new Error('message'), false)
}
const upload = multer({
  storage: imageStorage
})

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

// Get book by id
router.get('/:id', cors(), async (req, res) => {
  console.log("Getting book " + req.params.id)
  try {
    const book = await Book.findById(req.params.id)
    res.send(book)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one
router.get('/:id', getBook, (req, res) => {
  res.json(res.book)
})

router.post('/', upload.single('bookImage'), async (req, res) => {
  const book = new Book({
    name: req.body.name,
    courseId: req.body.courseId,
    edition: req.body.edition,
    author: req.body.author,
    bookImage: req.file.path,
    userId: req.body.userId,
    buyPrice: req.body.buyPrice,
    rentPrice: req.body.rentPrice,
    forRent: req.body.forRent,
    forSale: req.body.forSale,
    availability: true
  })
  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one
router.patch('/:id', getBook, async (req, res) => {
  if (req.res.book.name != null) {
      res.book.name = req.body.name
  }
  if (req.res.book.courseId != null) {
      res.book.courseId = req.body.courseId
  }
  if (req.res.book.edition != null) {
      res.book.edition = req.body.edition
  }
  if (req.res.book.author != null) {
      res.book.author = req.body.author
  }
  if (req.res.book.bookImage != null) {
      res.book.bookImage = req.body.bookImage
  }
  if (req.res.book.userId != null) {
      res.book.userId = req.body.userId
  }
  if (req.res.book.buyPrice != null) {
      res.book.buyPrice = req.body.buyPrice
  }
  if (req.res.book.rentPrice != null) {
      res.book.rentPrice = req.body.rentPrice
  }
  if (req.res.book.forRent != null) {
      res.book.forRent = req.body.forRent
  }
  if (req.res.book.forSale != null) {
      res.book.forSale = req.body.forSale
  }
  if (req.res.book.availability != null) {
      res.book.availability = req.body.availability
  }

  try {
      const updatedBook = await res.book.save()
      res.json(updatedBook)
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
router.delete('/', async (req, res) => {
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

//Add Comment
router.post('/:id/comment', async (req, res) => {
  const comment = new Comment({
    user: req.body.user,
    text: req.body.text,
    date: req.body.date,
    book: req.body.book,
  })
  try {
    const newComment = await comment.save()
    const bookRelated = await Book.findById(req.params.id);
    bookRelated.comments.push(comment)
    await bookRelated.save(function (err) {
      if (err) { console.log(err) }
    })
    res.status(201).json(newComment + ' and ' + bookRelated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Get all comments
router.get('/get/comments', cors(), async (req, res) => {
  console.log("Getting all comments")
  try {
    const comments = await Comment.find()
    res.send(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports = router
