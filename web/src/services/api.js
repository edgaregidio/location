import axios from 'axios'

export const api = axios.create({
  baseURL1: 'http://localhost:3333/'
})

export const getApi = async (email, password) => {
  return api.get('/data', { email, password })
}

// export const postApi = async (email, password) => {
//   return api.post('/data', { email, password })
// }
