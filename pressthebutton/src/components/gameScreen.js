import React from 'react'

const GameScreen = (props) => {



  // Count for next press
  const count = props.buttonCount.count
  const numString = count.toString()
  var tmp = numString.substring(numString.length - 1)
  const tmp2 = parseInt(tmp)
  const tmp3 = tmp2 - 10
  const tmp4 = tmp3 * -1

  return (
    <div className='container'>
      <h1>pressTHEbutton</h1>
      <div className='points'>
        <p>{props.userInfo.username}</p>
        <p>points: {props.userInfo.points}</p>
      </div>
      <button onClick={props.handlePress} className="button1">PRESS THIS</button>
      <p>How many presses for the next award? <br></br>{tmp4}</p>
    </div>
  )
}

export default GameScreen