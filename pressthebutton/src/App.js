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
      setUser(user1)
    }
  }, [])

  useEffect(() => {
    buttonService.getButton().then(button => setButton(button))
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
      id: user.id,
      points: user.points - 1
    }
    const res = await buttonService.pressButton()
    const res2 = await userService.updatePoints(user2)

    console.log(res2)

    const count = res.count
    console.log(count)
  }

  if (button === null) {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    )
  } else {
    return (
        <GameScreen handlePress={handlePress}/>
    )
  }
}

export default App;
