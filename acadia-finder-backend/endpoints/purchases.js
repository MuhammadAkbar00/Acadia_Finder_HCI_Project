const express = require('express')
const cors = require('cors')
const router = express.Router()
const Purchase = require('../models/purchases')

// Get all books
router.get('/', cors(), async (req, res) => {
    console.log("Getting all purchases")
    try {
        const purchases = await Purchase.find()
        res.send(purchases)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
  const purchase = new Purchase({
    
    sellerId: req.body.sellerId,
    purchaserId: req.body.purchaserId,
    bookId: req.body.bookId,
    datePurchased: req.body.datePurchased,
    listedPrice: req.body.listedPrice,
  })
  try {
    const newPurchase = await purchase.save()
      res.status(201).json(newPurchase)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})


// Delete one
router.delete('/:id', getPurchase, async (req, res) => {
  try {
      await res.purchase.remove()
      res.json({ message: "Deleted note" })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/',  async (req, res) => {
  Purchase.deleteMany({}).then(() => { 
      res.json({ message: "Deleted all purchase" })
  }).catch((err) => { 
      res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getPurchase(req, res, next) {

  let purchase
  try {
      purchase = await Purchase.findById(req.params.id)
      if (purchase == null) {
          return res.status(404).json({ message: "Cannot find purchase" })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.purchase = purchase
  next()
}


module.exports = router
