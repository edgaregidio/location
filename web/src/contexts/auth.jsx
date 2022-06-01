import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createSession, getUsers } from '../services/api'

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
    const response = await createSession(email, password)

    console.log('login', response.data)
    const loggedUser = response.data.user

    localStorage.setItem('user', JSON.stringify(loggedUser))

    setUser(loggedUser)
    navigate('/dashboard')
  }

  const logout = () => {
    console.log('Log Out!')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, getUsers }}
    >
      {children}
    </AuthContext.Provider>
  )
}
