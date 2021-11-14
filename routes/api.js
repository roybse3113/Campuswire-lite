const express = require('express')

const router = express.Router()
const Question = require('../models/question')
const User = require('../models/user')
const Account = require('./account')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/questions', async (req, res, next) => {
  try {
    const listQuestions = await Question.find()
    res.json(listQuestions)
  } catch (err) {
    next(new Error('error with questions'))
    // res.send('error accessing questions')
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const author = req.session.username
  // console.log('name: ', author)
  try {
    const user = await Question.create({ questionText, author })
    // console.log('sucess question')
    res.send('question created')
  } catch (err) {
    next(new Error('error adding a question'))
    // res.send('question add has problems')
    // throw new Error('user creation has problems')
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body

  try {
    let question = await Question.findOne({ _id })
    // console.log('before: ', question)
    if (!question) {
      res.send('question does not exist')
    } else {
      await Question.updateOne({ _id }, { answer })
      question = await Question.findOne({ _id })
      // console.log('after: ', question)
      res.send('question answered')
    }
  } catch (err) {
    next(new Error('error answering question'))
    // res.send('error answering question')
  }
})

module.exports = router
