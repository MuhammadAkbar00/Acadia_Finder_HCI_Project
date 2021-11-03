const express = require('express')
const cors = require('cors')
const router = express.Router()
const Holding = require('../models/holdings')

// Get all holdings
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Holdings")
    try {
        const holdings = await Holding.find()
        res.send(holdings)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getHolding, (req, res) => {
  res.json(res.holding)
})

router.post('/', async (req, res) => {
  const holding = new Holding({
    bookId: req.body.bookId,
    userId: req.body.userId,
    ownerId: req.body.ownerId,
    forRent: req.body.forRent,
    forPurchase: req.body.forPurchase,
  })
  try {
    const newHolding = await holding.save()
      res.status(201).json(newHolding)
  } catch (err) {
      res.status(400).json({ message: "Item already exists in your Holdings" })
  }
})


// Delete one
router.delete('/:id', getHolding, async (req, res) => {
  try {
      await res.holding.remove()
      res.json({ message: "Deleted Holding" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Holding.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Holdings" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getHolding(req, res, next) {

  let holding
  try {
      holding = await Holding.findById(req.params.id)
      if (holding == null) {
          return res.status(404).json({ message: "Cannot find Holding" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.holding = holding
  next()
}


module.exports = router
