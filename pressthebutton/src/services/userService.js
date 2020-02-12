import axios from 'axios'
const baseUrl = '/api/blogs'

const getUsers = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async newObject => {
  const user = {
    "username": newObject,
    "points": 20
  }
  const response = await axios.post(baseUrl, user)
  return response.data
}