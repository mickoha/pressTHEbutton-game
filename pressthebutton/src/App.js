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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedButtonGamePlayer')
    if (loggedUser) {
      const user1 = JSON.parse(loggedUser)
      const usernameTmp = user1.username

      async function getUser() {
        const users = await userService.getUsers()
        console.log(users)
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
    const user2 = {
      ...user, points: user.points - 1
    }

    setUser(user2)
    setButton({...button, count: button.count+1})

    const res = await buttonService.pressButton()
    const res2 = await userService.updatePoints(user2)

    const points = res2.points - 1

    const count = button.count +1
    let points2 = points

    if (count % 500 === 0) {
      points2+= 250
    } else if (count % 100 === 0) {
      points2+= 40
    } else if (count % 10 === 0) {
      points2+= 5
    }

    if (user.points != points2) {
      const user3 = {
        ...user, points: points2
      }

      const res3 = await userService.updatePoints(user3)
    }
  }
  if (button === null) {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    )
  } else {
    return (
        <GameScreen buttonCount={button} userInfo={user} handlePress={handlePress}/>
    )
  }
}

export default App;
