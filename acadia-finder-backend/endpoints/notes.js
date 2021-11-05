const express = require('express')
const cors = require('cors')
const router = express.Router()
const Note = require('../models/notes')
const multer = require('multer');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: (req, file, cb) => {
    cb(null, './note_uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage: imageStorage
})
// Get all books
router.get('/', cors(), async (req, res) => {
  console.log("Getting all Notes")
  try {
    const notes = await Note.find()
    res.send(notes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', upload.single("noteFile"), async (req, res) => {
  const note = new Note({
    courseId: req.body.courseId,
    providerId: req.body.providerId,
    noteFile: req.file.path,
    datePosted: req.body.datePosted,
    description: req.body.description,
    semester: req.body.semester,
  })
  try {
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.remove()
    res.json({ message: "Deleted Note" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/', async (req, res) => {
  Note.deleteMany({}).then(() => {
    res.json({ message: "Deleted all Notes" })
  }).catch((err) => {
    res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getNote(req, res, next) {

  let note
  try {
    note = await Note.findById(req.params.id)
    if (note == null) {
      return res.status(404).json({ message: "Cannot find Note" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.note = note
  next()
}


module.exports = router
