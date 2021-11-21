import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom'
import axios from 'axios'
import Signup from './components/signup'
import Login from './components/login'
import Home from './components/home'

const App = () => {
  const [data, setData] = useState([])
  useEffect(async () => {
    const { data: questions } = await axios.get('/api/questions')
    setData(questions)
  }, [])
  return (
    <Router>
      <div>
        <br />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
    // <div>
    //   <h2> Questions </h2>{' '}
    //   {data.map(question => (
    //     <p>{question.questionText}</p>
    //   ))}
    // </div>
  )
}

export default App
