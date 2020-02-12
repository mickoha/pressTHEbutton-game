import React from 'react'

const GameScreen = (props) => {
  return (
    <div className='container'>
      <h1>pressTHEbutton</h1>
      <div className='points'>
        <p>points:</p>
        <p>XXX</p>
      </div>
      <button onClick={props.handlePress} className="button1">PRESS THIS</button>
      <p> pressing to next reward</p>
    </div>
  )
}

export default GameScreen