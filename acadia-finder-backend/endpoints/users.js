const express = require('express');
const cors = require('cors');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/users');
const jwt = require("jsonwebtoken");

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

// Get userId with token to match their books and notes
router.get('/user', (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'Unauthorized'
    })
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'User Retrieved!',
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userName: user.userName,
          major: user.major
        }
      })
    })
  })
})


// Get user by id
router.get('/:id', cors(), async (req, res) => {
  console.log("Getting user " + req.params.id)
  try {
    const user = await User.findById(req.params.id)
    res.send(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/signup', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: bcrypt.hashSync(req.body.password, 10),
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


router.post('/login', async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({
      title: "Server Error",
      error: err.message
    })
    if (!user) return res.status(401).json({
      title: "User not found",
      error: "Check Email and Password"
    })
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({
        title: "Failed to login",
        error: "Check if password is correct"
      })
    let token = jwt.sign({ userId: user._id }, 'secretkey')
    return res.status(200).json({
      title: "Login Successful",
      token: token
    })
  })
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
router.delete('/', async (req, res) => {
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

// Get friendship
router.get('/:id/friendship', cors(), async (req, res) => {
  console.log("Getting friendship")
  try {
    let { id } = req.params
    console.log(id)
    let user = await User.aggregate([
      { "$match": { "_id": id } },
      {
        "$lookup": {
          "from": User.collection.name,
          "let": { "friends": "$friends" },
          "pipeline": [
            {
              "$match": {
                "friends.status": 1,
              }
            },
            {
              "$project": {
                "name": 1,
                "email": 1,
                "avatar": 1
              }
            }
          ],
          "as": "friends"
        }
      },
    ])

    res.json({
      user
    })
    // res.send(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports = router
