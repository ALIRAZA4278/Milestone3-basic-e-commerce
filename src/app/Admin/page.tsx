"use client"
import {   useState } from 'react'
import Login from './Auth/Login'
import AdminDashboard from './Dashboard/AdminDashboard'

interface User {
  role: 'admin' | null;
  // data?: any;
}

const App = () => {
  const [user, setUser] = useState<User>({ role: null })
  const LoginPassword = process.env.NEXT_PUBLIC_PASSWORD
  const LoginAdmin = process.env.NEXT_PUBLIC_ADMIN
 

  const handleLogin = (email: string, password: string) => {
    if (email === LoginAdmin && password === LoginPassword) {
      setUser({ role: 'admin' })
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <>
      {!user.role ? (
        <Login handleLogin={handleLogin} />
      ) : user.role === 'admin' ? (
        <AdminDashboard  />
      ) : null}
    </>
  )
}

export default App
