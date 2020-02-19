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
  const [awardNotification, setAwardNotification] = useState("")
  const [startOver, setStartOver] = useState(false)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedButtonGamePlayer')
    if (loggedUser) {
      const user1 = JSON.parse(loggedUser)
      const usernameTmp = user1.username

      async function getUser() {
        const users = await userService.getUsers()
        const thisUser = users.find(user => user.username === usernameTmp)
        setUser(thisUser)
      }

      getUser()
      
      
    }
  }, [])

  useEffect(() => {
    buttonService.getButton().then(button => setButton(button[0]))
  },[])
  
  if (user === null) {
    return (
      <div className='container'>
        <h1>pressTHEbutton</h1>
        <NewUserScreen />
      </div>
    )
  }
  
  const handlePress = async (props) => {
    let user2 = {
      ...user
    }
    
    const res = await buttonService.pressButton()
    setButton(res)

    const countATM = res.count

    let pointsTmp = 0

    console.log(countATM)
    if (countATM % 500 === 0) {
      pointsTmp = 250
    } else if (countATM % 100 === 0) {
      pointsTmp = 40
    } else if (countATM % 10 === 0) {
      pointsTmp = 5
    }

    console.log(pointsTmp)
    user2 = {
      ...user2, points: user2.points + pointsTmp - 1
    }
    console.log(user2)
    const res2 = await userService.updatePoints(user2)


    if (res2.points === 0) {
      setStartOver(true)
    }
    
    setUser(res2)
    
  }

  if (button === null) {
    return (
      <div>
        <h3>loading...</h3>
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
      </div>
    )
  }
}

export default App;
