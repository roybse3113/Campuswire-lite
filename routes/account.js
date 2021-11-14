const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

// signup
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  if (username.length !== 0) {
    try {
      const user = await User.create({ username, password })
      res.send('user created')
    } catch (err) {
      next(err)
      // next(new Error('user signup has problems'))
      // console.log(err)
      // res.send('user creation has problems')
      // throw new Error('user creation has problems')
    }
  } else {
    next(new Error('username is empty'))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    if (req.session.username && req.session.password) {
      res.send('user already logged in')
    } else {
      const user = await User.findOne({ username })

      if (!user) {
        res.send('user does not exist')
      } else {
        const { password: passDB } = user

        if (password === passDB) {
          req.session.username = username
          req.session.password = password
          res.send('user logged in successfully')
        } else {
          res.send('user credentials are wrong')
        }
      }
    }
  } catch (err) {
    next(err)
    // next(new Error('user login has problems'))
    // res.send('user login has problems')
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user has logged out')
})

module.exports = router
