const express = require('express')
const cors = require('cors')
const router = express.Router()
const Rental = require('../models/rentals')

// Get all rental
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Rentals")
    try {
        const rentals = await Rental.find()
        res.send(rentals)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const rental = new Rental({
    renterId: req.body.renterId,
    renteeId: req.body.renteeId,
    bookId: req.body.bookId,
    rentedDate: req.body.rentedDate,
    returnDate: req.body.returnDate
  })
  try {
    const newRental = await rental.save()
      res.status(201).json(newRental)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getRental, async (req, res) => {
  try {
      await res.rental.remove()
      res.json({ message: "Deleted Rental" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Rental.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Rentals" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getRental(req, res, next) {

  let rental
  try {
      rental = await Rental.findById(req.params.id)
      if (rental == null) {
          return res.status(404).json({ message: "Cannot find Rental" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.rental = rental
  next()
}


module.exports = router
