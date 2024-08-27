import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import HomePage from './pages/HomePage'
import AuthForm from './pages/AuthForm'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForm setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </>
  )
}

export default App
