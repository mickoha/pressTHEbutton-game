import React , {useState, useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import NewUserScreen from './components/newUser'
import GameScreen from './components/gameScreen'

import buttonService from './services/buttonService'
import userService from './services/userService';

const App = (props) => {
  const [user, setUser] = useState(null)
  const [button, setButton] = useState(null)
  const [awardNotification, setAwardNotification] = useState(null)
  const [startOver, setStartOver] = useState(false)


  // Find logged user from mongoDB
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedButtonGamePlayer')
    if (loggedUser) {
      const user1 = JSON.parse(loggedUser)
      const usernameTmp = user1.username

      async function getUser() {
        const users = await userService.getUsers()
        const thisUser = users.find(user => user.username === usernameTmp)
        if (thisUser) {
          setUser(thisUser)
        } else {
          // If deleted from mongoDB, delete from browser.
          window.localStorage.removeItem('loggedButtonGamePlayer')
        }
      }

      getUser()
      
      
    }
  }, [])
  

  // Gets button from mongoDB.
  useEffect(() => {
    buttonService.getButton().then(button => setButton(button[0]))
  },[])
 
  
  const handlePress = async (props) => {
    let user2 = {
      ...user
    }
    
    const res = await buttonService.pressButton()
    setButton(res)

    const countATM = res.count

    let pointsTmp = 0

    // Size of award
    if (countATM % 500 === 0) {
      pointsTmp = 250
    } else if (countATM % 100 === 0) {
      pointsTmp = 40
    } else if (countATM % 10 === 0) {
      pointsTmp = 5
    }

    // Set awardNotification for 2sec
    if (pointsTmp !== 0) {
      setAwardNotification(pointsTmp)
      setTimeout(function() {
        setAwardNotification(null)
      }, 2000)
    }

    user2 = {
      ...user2, points: user2.points + pointsTmp - 1
    }

    const res2 = await userService.updatePoints(user2)

    if (res2.points === 0) {
      setStartOver(true)
    }
    
    setUser(res2)
    
  }

  // If there is no button to press, start new game
  const newButton = () => {
    buttonService.startGame()
    window.location.reload()
  }


  const notification = (props) =>{
    return (
      <div className='awardNotification'>
        <h1>YOU GOT {props} POINTS!</h1>
      </div>
    )
  }

   
  if (user === null) {
    return (
      <div className='container'>
        <h1>pressTHEbutton</h1>
        <NewUserScreen />
      </div>
    )
  }

  if (button === null || button === undefined) {
    return (
      <div>
        <h3>loading...</h3>
        <button onClick={newButton}>new game?</button>
      </div>
    )
  } else {
    return (
      <div>
      
        <GameScreen 
          startOver={startOver}
          awardNotification={awardNotification} 
          buttonCount={button} 
          userInfo={user} 
          handlePress={handlePress}/>
          
          {awardNotification && notification(awardNotification)}
      </div>
    )
  }
}

export default App;
