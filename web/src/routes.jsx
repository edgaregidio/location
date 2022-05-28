import React, { Children, useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { AuthProvider, AuthContext } from './contexts/auth'

export default function MainRoutes() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)
    if (loading) {
      return <div className="loading">Espera, está quase la!</div>
    }
    if (!authenticated) {
      return <Navigate to="/Login" />
    }
    return children
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
