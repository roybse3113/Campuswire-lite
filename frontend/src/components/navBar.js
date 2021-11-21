import React, { useState } from 'react'
import axios from 'axios'
import { Navbar, Container } from 'react-bootstrap'
import '../styles/home.css'

// reference: https://getbootstrap.com/docs/4.0/components/navbar/

const navBar = ({ username, loginStatus, setLoginStatus }) => {
  const logOut = async () => {
    const { data: response } = await axios.post('/account/logout')
    if (response === 'user has logged out') {
      setLoginStatus(false)
    }
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Campuswire Lite</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {loginStatus ? (
              <Navbar.Text>
                Hello,
                {' '}
                {username}
                {' '}
                <button className="submit" type="button" onClick={logOut}>
                  Log out
                </button>
              </Navbar.Text>
            ) : (
              ''
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default navBar
