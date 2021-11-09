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
// Get all notes
router.get('/', cors(), async (req, res) => {
  console.log("Getting all Notes")
  try {
    const notes = await Note.find()
    res.send(notes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', upload.any("noteFiles"), async (req, res) => {
  let noteFileList = []
  req.files.map((file => {
    const f = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    }
    noteFileList.push(f)
  }))
  const note = new Note({
    courseId: req.body.courseId,
    providerId: req.body.providerId,
    noteFiles: noteFileList,
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

// Get note by id
router.get('/:id', cors(), async (req, res) => {
  console.log("Getting note " + req.params.id)
  try {
    const note = await Note.findById(req.params.id)
    res.send(note)
  } catch (err) {
    res.status(500).json({ message: err.message })
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

// Update one
router.patch('/:id', getNote, upload.any("noteFiles"), async (req, res) => {
  if (req.res.note.courseId != null && req.res.note.courseId != req.body.courseId) {
    res.note.courseId = req.body.courseId
  }
  if (req.res.note.noteFiles != null && req.files.length > 0) {
    let noteFileList = []
    req.files.map((file => {
      const f = {
        originalname: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
      }
      noteFileList.push(f)
    }))
    res.note.noteFiles = noteFileList
  }
  if (req.res.note.datePosted != null && req.res.note.datePosted != req.body.datePosted) {
    res.note.datePosted = req.body.datePosted
  }
  if (req.res.note.description != null && req.res.note.description != req.body.description) {
    res.note.description = req.body.description
  }
  if (req.res.note.semester != null && req.res.note.semester != req.body.semester) {
    res.note.semester = req.body.semester
  }
  try {
    const updatedNote = await res.note.save()
    res.json(updatedNote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


module.exports = router
