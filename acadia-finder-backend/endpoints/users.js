const express = require('express')
const cors = require('cors')
const router = express.Router()
const User = require('../models/users')

// Get all user
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Users")
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    major: req.body.major
  })
  try {
    const newUser = await user.save()
      res.status(201).json(newUser)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getUser, async (req, res) => {
  try {
      await res.user.remove()
      res.json({ message: "Deleted User" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  User.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Users" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getUser(req, res, next) {

  let user
  try {
      user = await User.findById(req.params.id)
      if (user == null) {
          return res.status(404).json({ message: "Cannot find User" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}


module.exports = router
