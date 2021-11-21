/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './navBar'
import '../styles/home.css'

const home = () => {
  const [data, setData] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const [username, setUsername] = useState('')

  const [questionText, setQuestionText] = useState('')
  const [answer, setAnswer] = useState('')
  const [ID, setID] = useState('')

  const [showAddButton, setShowAddButton] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const checkStatus = async () => {
    const { data: user } = await axios.get('/account/status')
    if (user !== 'not logged in') {
      setUsername(user.username)
      setLoginStatus(true)
    }
  }

  const answerQuestion = async _id => {
    const { data: response } = await axios.post('/api/questions/answer', {
      _id,
      answer,
    })
    document.getElementById('input').value = ''
    setAnswer('')
    if (response !== 'question successfully answered') {
      alert('error answer question or already answered')
    }
  }

  const askQuestion = async () => {
    const { data: response } = await axios.post('/api/questions/add', {
      questionText,
    })
    document.getElementById('input').value = ''
    setShowAddButton(false)
    setQuestionText('')
    if (response !== 'question created') {
      alert('error posting question')
    }
  }

  const addButtonVisibility = () => {
    if (showAddButton) {
      return (
        <div className="addQuestion">
          <textarea
            id="input"
            onChange={e => setQuestionText(e.target.value)}
          />
          <br />
          <button
            className="submit"
            type="button"
            onClick={() => askQuestion()}
          >
            Submit Question
          </button>
          <button
            className="cancel"
            type="button"
            onClick={() => setShowAddButton(false)}
          >
            Cancel
          </button>
        </div>
      )
    }
    return (
      <button
        className="first"
        type="button"
        onClick={() => setShowAddButton(true)}
      >
        Add Question
      </button>
    )
  }

  const questionForm = question => {
    if (loginStatus) {
      return (
        <div className="answerForm">
          <textarea id="input" onChange={e => setAnswer(e.target.value)} />
          <br />
          <button
            className="submit"
            type="button"
            onClick={() => answerQuestion(question._id)}
          >
            Submit Answer
          </button>
        </div>
      )
    }
    return ''
  }

  const displayQuestion = id => {
    setShowForm(true)
    setID(id)
  }

  useEffect(() => {
    const intervalID = setInterval(async () => {
      checkStatus()
      const { data: questions } = await axios.get('/api/questions')
      setData(questions)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div>
      <NavBar
        username={username}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
      <ul>
        <li>
          <div>
            <div>
              {loginStatus ? (
                addButtonVisibility()
              ) : (
                <button
                  className="first"
                  type="button"
                  onClick={() => navigate('/login')}
                >
                  Log in to ask a question
                </button>
              )}
            </div>
            {data.map(question => (
              <div className="question" key={question._id}>
                <button
                  className="questionButton"
                  type="button"
                  onClick={() => displayQuestion(question._id)}
                >
                  {question.questionText}
                </button>
              </div>
            ))}
          </div>
        </li>
        <li className="curr">
          {showForm ? data.map(question => ((question._id === ID) ? (
            <div key={question._id} className="CurrQuestion">
              <h6>Question: </h6>
              <p>{question.questionText}</p>
              <h6>Author: </h6>
              <p>{question.author}</p>
              <h6>Answer: </h6>
              {question.answer ? '' : questionForm(question)}
              <p>{question.answer}</p>
            </div>
          ) : '')) : ''}

        </li>
      </ul>
    </div>
  )
}

export default home
