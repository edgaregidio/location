import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api, getApi } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const retrievingUser = localStorage.getItem(['user'])

    if (retrievingUser) {
      setUser(JSON.parse(retrievingUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await getApi(email, password)

    console.log('login', response.data)

    // api criando uma session
    // resposta do banco
    const loggedUser = response.data

    localStorage.setItem('user', JSON.stringify(loggedUser))

    setUser(loggedUser)
    navigate('/')
  }

  const logout = () => {
    console.log('Log Out!')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
