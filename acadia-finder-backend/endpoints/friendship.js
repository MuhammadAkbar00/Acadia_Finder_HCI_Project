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

// Get friendship by id
router.get('/:id', cors(), async (req, res) => {
  try {
    const friendship = await Friendship.findById(req.params.id)
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
    let UserA = await Users.findById(req.params.idRequester)
    let UserB = await Users.findById(req.params.idRecipient)
    const docA = await Friendship.findOneAndUpdate(
      { "_id": UserA._id },
      { $push: { "incomingRequests": [UserB._id] } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { "_id": UserB._id },
      { $push: { "outgoingRequests": [UserA._id] } },
      { upsert: true, new: true }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Unfriend Friend
router.post('/:idRequester/unfriend/:idRecipient', async (req, res) => {
  try {
    let UserA = await Users.findById(req.params.idRequester)
    let UserB = await Users.findById(req.params.idRecipient)
    const docA = await Friendship.findOneAndUpdate(
      { "_id": UserA._id },
      { $pull: { "friends": UserB._id } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { "_id": UserB._id },
      { $pull: { "friends": UserA._id } },
      { upsert: true, new: true }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Accept Friend request
router.post('/:idRequester/accepts/:idRecipient', async (req, res) => {
  try {
    let UserA = await Users.findById(req.params.idRequester)
    let UserB = await Users.findById(req.params.idRecipient)
    const docA = await Friendship.findOneAndUpdate(
      { "_id": UserA._id },
      { $push: { "friends": UserB._id }, $pull: { "outgoingRequests": UserB._id } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { "_id": UserB._id },
      { $push: { "friends": UserA._id }, $pull: { "incomingRequests": UserA._id } },
      { upsert: true, new: true }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Decline Friend request
router.post('/:idRequester/decline/:idRecipient', async (req, res) => {
  try {
    let UserA = await Users.findById(req.params.idRequester)
    let UserB = await Users.findById(req.params.idRecipient)
    const docA = await Friendship.findOneAndUpdate(
      { "_id": UserA._id },
      { $pull: { "outgoingRequests": UserB._id } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { "_id": UserB._id },
      { $pull: { "incomingRequests": UserA._id } },
      { upsert: true, new: true }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Cancel Friend request
router.post('/:idRequester/cancel/:idRecipient', async (req, res) => {
  try {
    let UserA = await Users.findById(req.params.idRequester)
    let UserB = await Users.findById(req.params.idRecipient)
    const docA = await Friendship.findOneAndUpdate(
      { "_id": UserA._id },
      { $pull: { "incomingRequests": UserB._id } },
      { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
      { "_id": UserB._id },
      { $pull: { "outgoingRequests": UserA._id } },
      { upsert: true, new: true }
    )
    res.status(201).json(docA)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
