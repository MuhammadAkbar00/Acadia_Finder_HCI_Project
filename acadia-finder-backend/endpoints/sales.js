const express = require('express')
const cors = require('cors')
const router = express.Router()
const Sale = require('../models/sales')

// Get all sale
router.get('/', cors(), async (req, res) => {
    console.log("Getting all Sales")
    try {
        const sales = await Sale.find()
        res.send(sales)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const sale = new Sale({
    sellerId: req.body.sellerId,
    purchaserId: req.body.purchaserId,
    bookId: req.body.bookId,
    dateSold: req.body.dateSold,
    listedPrice: req.body.listedPrice
  })
  try {
    const newSale = await sale.save()
      res.status(201).json(newSale)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getSale, async (req, res) => {
  try {
      await res.sale.remove()
      res.json({ message: "Deleted Sale" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Sale.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all Sales" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getSale(req, res, next) {

  let sale
  try {
      sale = await Sale.findById(req.params.id)
      if (sale == null) {
          return res.status(404).json({ message: "Cannot find Sale" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.sale = sale
  next()
}


module.exports = router
