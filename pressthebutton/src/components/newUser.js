import React from 'react'

import userService from '../services/userService'

import {Form, Button, Col} from 'react-bootstrap'

const NewUserScreen = (props) => {

  const handleNewUser = async (event) => {
    event.preventDefault()
    const user = await userService.createUser(event.target.username.value)
    if (user) {
      window.localStorage.setItem('loggedButtonGamePlayer', JSON.stringify(user))
      window.location.reload()
    }
  }

  return (
    <div>
      <Form onSubmit={handleNewUser}>
      <Form.Label>Welcome to the pTb-Game! Please, enter your username:</Form.Label>
        <Form.Row>
          <Col>
          <Form.Control
            type='text'
            name='username'
            placeholder="Username"
            />
          </Col>
          <Col>
            <Button variant='primary' type='submit'>Start</Button>
          </Col>
        </Form.Row>
      </Form>
      <p>In the game, you just need to press the button!<br></br> Every 10th press will give you reward!</p>
    </div>
  )
}

export default NewUserScreen