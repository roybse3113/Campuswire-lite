import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/home.css'

const form = ({
  setData,
  question,
  loginStatus,
  setAnswer,
  answerQuestion,
  data,
  answer,
}) => {
  const [ans, setAns] = useState('')
  const questionForm = () => {
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

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data: questions } = await axios.get('/api/questions')
      setData(questions)
      const currQ = data.filter(qe => question._id === qe._id)
      data.map(qe => (qe._id === question._id ? setAns(qe.answer) : ''))
    }, 3000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="CurrQuestion">
      <h6>Question: </h6>
      <p>{question.questionText}</p>
      <h6>Author: </h6>
      <p>{question.author}</p>
      <h6>Answer: </h6>
      {question.answer ? '' : questionForm()}
      <p>{ans}</p>
    </div>
  )
}

export default form
