import React from 'react'
import {Button} from 'react-bootstrap'

import userService from '../services/userService'

const GameScreen = (props) => {



  // Count for next press
  const count = props.buttonCount.count
  const numString = count.toString()
  var tmp = numString.substring(numString.length - 1)
  const tmp2 = parseInt(tmp)
  const tmp3 = tmp2 - 10
  const tmp4 = tmp3 * -1

  const handlePress = async (event) => {
    event.preventDefault()
    const user = {...props.userInfo, points: 20}
    const res = await userService.updatePoints(user)
    window.location.reload();
  }

  if (props.startOver) {
    return ( 
      <div className='container'>
        <h1>pressTHEbutton</h1>
        <div className='startOver'>
          <h2>
            GameOver!
          </h2>
          <p>Start again by pressing</p>
          <Button variant="primary" onClick={handlePress}>HERE</Button>
        </div>
      </div>
    )
  } else {
    return (
    <div className='container'>
      <h1>pressTHEbutton</h1>
      
      <div className='points'>
        <p>{props.userInfo.username}</p>
        <p>points: <strong>{props.userInfo.points}</strong></p>
      </div>
      <button onClick={props.handlePress} className="button1">PRESS THIS</button>
      <p>Keep going! <strong>{tmp4}</strong> more press for the next award!</p>
    </div>
    )
  }
}

export default GameScreen