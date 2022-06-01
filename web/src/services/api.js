import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/'
})

export const createSession = async (email, password) => {
  return api.post('/users/sessions', { email, password })
}

export const getUsers = async () => {
  return api.get('/users')
}
