import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { AuthProvider, AuthContext } from './contexts/auth'
import Register from './pages/Register'

export default function MainRoutes() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)
    if (loading) {
      return <div className="loading">Espera, está quase la!</div>
    }
    if (!authenticated) {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}
