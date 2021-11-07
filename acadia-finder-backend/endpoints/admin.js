const express = require('express');
const cors = require('cors');
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");
const admin = require('../models/admin');



// Get all Admins
router.get('/', cors(), async (req, res) => {
  console.log("Getting all Admins")
  try {
    const admins = await Admin.find()
    res.send(admins)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Get admin by id
router.get('/:id', cors(), async (req, res) => {
  console.log("Getting admin " + req.params.id)
  try {
    const admin = await Admin.findById(req.params.id)
    res.send(admin)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const admin = new Admin({
    password: bcrypt.hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  })
  try {
    Admin.findOne({ $or: [{ email: admin.email }] }, function (err, result) {
      if (err) {
        console.log("error")
      }
      if (result) {
        res.status(401).json({
          title: "Admin already exists",
          error: "This Email or Username already exists"
        })
      }
    })
    const newAdmin = await admin.save()
    res.status(201).json(newAdmin)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.post('/login', async (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (err) return res.status(500).json({
      title: "Server Error",
      error: err.message
    })
    if (!admin) return res.status(401).json({
      title: "Admin not found",
      error: "Check Email and Password"
    })
    if (!bcrypt.compareSync(req.body.password, admin.password))
      return res.status(401).json({
        title: "Failed to login",
        error: "Check if password is correct"
      })
    let admin_token = jwt.sign({ userId: admin._id }, 'secretkey2')
    return res.status(200).json({
      title: "Login Successful",
      admin: {
        name: admin.firstName + " " + admin.lastName,
        emal: admin.email
    },
    admin_token: admin_token
    })
  })
})

// Delete one
router.delete('/:id', getAdmin, async (req, res) => {
  try {
    await res.admin.remove()
    res.json({ message: "Deleted Admin" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete many
router.delete('/', async (req, res) => {
  Admin.deleteMany({}).then(() => {
    res.json({ message: "Deleted all Admins" })
  }).catch((err) => {
    res.status(500).json({ message: err.message })

  });

})

// Middleware
async function getAdmin(req, res, next) {
  let admin
  try {
    admin = await Admin.findById(req.params.id)
    if (admin == null) {
      return res.status(404).json({ message: "Cannot find Admin" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.admin = admin
  next()
}

module.exports = router
