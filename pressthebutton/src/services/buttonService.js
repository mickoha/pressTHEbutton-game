import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/button'

const getButton = async() => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const pressButton = async () => {
  const res = await axios.put(baseUrl)
  return res.data
}

export default {getButton, pressButton}