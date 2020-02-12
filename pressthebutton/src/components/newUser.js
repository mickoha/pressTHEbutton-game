import React from 'react'

import userService from '../services/userService'

import {Form, Button} from 'react-bootstrap'

const NewUserScreen = (props) => {

  const handleNewUser = async () => {

  }

  return (
    <div>
      <Form onSubmit={handleNewUser}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            />
          <Button variant='primary' type='submit'>Start</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewUserScreen