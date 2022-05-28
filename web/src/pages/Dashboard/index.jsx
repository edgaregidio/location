import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

export default function Dashboard() {
  const { logout, authenticated } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{String(authenticated)}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}
