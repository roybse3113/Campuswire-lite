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
  }
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const author = req.session.username
  try {
    if (questionText.length !== 0) {
      const user = await Question.create({ questionText, author })
      res.send('question created')
    } else {
      res.send('empty question')
    }
  } catch (err) {
    next(new Error('error adding a question'))
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body

  try {
    const question = await Question.findOne({ _id })
    // if question is already answered
    if (!question) {
      res.send('question does not exist')
    } else if (!question.answer) {
      if (answer.length > 0) {
        await Question.updateOne({ _id }, { answer })
        res.send('question successfully answered')
      } else {
        res.send('empty answer')
      }
    } else {
      res.send('question already answered')
    }
  } catch (err) {
    next(new Error('error answering question'))
  }
})

module.exports = router
