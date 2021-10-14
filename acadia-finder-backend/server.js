// require('dotenv').config()
const cors = require("cors")
const express = require('express')
const app = express()

app.use(cors())

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/acadia_finder_db", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

// middleware
const usersRouter = require('./endpoints/users')
const booksRouter = require('./endpoints/books')

app.use('/users', usersRouter)
app.use('/books', booksRouter)


app.listen(3000, () => console.log("server started"))
