const express = require('express')
const cors = require('cors')
const router = express.Router()
const Friendship = require('../models/friendship')
const Users = require('../models/users')



// Get all sale
router.get('/', cors(), async (req, res) => {
  console.log("Getting all friendship")
  try {
    const friendship = await Friendship.find()
    res.send(friendship)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const friendship = new Friendship({
    requester: req.body.requester,
    recipient: req.body.recipient,
    status: req.body.status,
  })
  try {
    const newFriendship = await friendship.save()
    res.status(201).json(newFriendship)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getFriendship, async (req, res) => {
  try {
    await res.friendship.remove()
    res.json({ message: "Deleted Friendship" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/', async (req, res) => {
  Friendship.deleteMany({}).then(() => {
    res.json({ message: "Deleted all Friendship" })
  }).catch((err) => {
    res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getFriendship(req, res, next) {

  let friendship
  try {
    friendship = await Friendship.findById(req.params.id)
    if (friendship == null) {
      return res.status(404).json({ message: "Cannot find Friendship" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.friendship = friendship
  next()
}

// Add Friends
router.post('/:idRequester/add/:idRecipient', async (req, res) => {
  try {
    console.log("THIS IS RUNNING")
    let UserA = await Users.findById('617da58dab4ec46974ea7351')
    let UserB = await Users.findById('617d9b8c145fea8b14c7b54a')
    const docA = await Friendship.findOneAndUpdate(
      { requester: UserA, recipient: UserB },
      { $set: { status: 1 } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { recipient: UserA, requester: UserB },
      { $set: { status: 2 } },
      { upsert: true, new: true }
    )
    const updateUserA = await Users.findOneAndUpdate(
      { _id: UserA },
      { $push: { friends: docA._id } }
    )
    const updateUserB = await Users.findOneAndUpdate(
      { _id: UserB },
      { $push: { friends: docB._id } }
    )
    res.status(201).json("Hello")
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Accept Friend request
router.post('/accepted', async (req, res) => {
  try {
    Friendship.findOneAndUpdate(
      { requester: UserA, recipient: UserB },
      { $set: { status: 3 } }
    )
    Friendship.findOneAndUpdate(
      { recipient: UserA, requester: UserB },
      { $set: { status: 3 } }
    )
    res.status(201).json("a")
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Decline Friend request
router.post('/decline', async (req, res) => {
  try {
    const docA = await Friendship.findOneAndRemove(
      { requester: UserA, recipient: UserB }
    )
    const docB = await Friendship.findOneAndRemove(
      { recipient: UserA, requester: UserB }
    )
    const updateUserA = await Users.findOneAndUpdate(
      { _id: UserA },
      { $pull: { friends: docA._id } }
    )
    const updateUserB = await Users.findOneAndUpdate(
      { _id: UserB },
      { $pull: { friends: docB._id } }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



module.exports = router
