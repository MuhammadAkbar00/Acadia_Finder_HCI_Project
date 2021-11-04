const express = require('express')
const cors = require('cors')
const router = express.Router()
const Contact= require('../models/contact')

// Get all messages
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Messages")
    try {
        const message= await Contact.find()
        res.send(message)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const message = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  })
  try {
    const newMessage = await message.save()
      res.status(201).json(newMessage)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getMessage, async (req, res) => {
  try {
      await res.message.remove()
      res.json({ message: "Deleted Message" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Contact.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Messages" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getMessage(req, res, next) {

  let message
  try {
      message = await Contact.findById(req.params.id)
      if (message == null) {
          return res.status(404).json({ message: "Cannot find Message" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.message = message
  next()
}


module.exports = router
