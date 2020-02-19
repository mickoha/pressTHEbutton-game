import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/user'

const getUsers = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async newObject => {
  console.log(newObject)
  const user = {
    "username": newObject,
    "points": 20
  }
  const response = await axios.post(baseUrl, user)
  return response.data
}

const updatePoints = async newObject => {
  const user = newObject
  const res = await axios.put(`${baseUrl}/${newObject.id}`, user)
  return res.data
}
export default {getUsers, createUser, updatePoints}