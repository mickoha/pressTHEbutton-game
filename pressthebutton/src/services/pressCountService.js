import axios from 'axios'

const baseUrl = 'http://localhost:3001/presscount'

const getInfo = async() => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const pressButton = async(props) => {
  const token = props.token
  const response = await axios.put(baseUrl, body)
  return response.data
}