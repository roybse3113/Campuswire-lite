const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const path = require('path')
const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')
const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswire-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 1000 * 24 * 60 * 60,
  }),
)

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

// error handling middleware at bottom of stack
app.use((err, req, res, next) => {
  // res.status(200).send('Error: ', err.message)
  res.status(err.status || 500)
  res.status(200).json({
    message: err.message,
    error: err,
  })
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// exception for console logging ports
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000')
})
