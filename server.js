const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswire-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => res.send('hello world!'))

// always use to handle POST --> req.body
app.use(express.json())

app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 1000 * 24 * 60 * 60,
  }),
)

app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`Welccome back, ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err,
  })
})

// exception for console logging ports
app.listen(3000, () => {
  console.log('listening on port 3000')
})
