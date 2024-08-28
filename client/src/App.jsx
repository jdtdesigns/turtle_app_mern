import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Header from './components/Header'
import Protect from './components/Protect'

import HomePage from './pages/HomePage'
import AuthForm from './pages/AuthForm'
import Dashboard from './pages/Dashboard'

import { GET_USER } from './graphql/queries'

function App() {
  const [user, setUser] = useState(null)
  const { loading, data } = useQuery(GET_USER)

  useEffect(() => {
    if (data) {
      setUser(data.getUser.user)
    }
  }, [data])

  return (
    <>
      {loading && (
        <div className="overlay row justify-center align-center">
          <h1>Loading...</h1>
        </div>
      )}

      <Header setUser={setUser} user={user} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={(
          <Protect requireAuth={false} user={user}>
            <AuthForm setUser={setUser} />
          </Protect>
        )} />
        <Route path="/dashboard" element={(
          <Protect requireAuth={true} user={user}>
            <Dashboard user={user} />
          </Protect>
        )} />
      </Routes>
    </>
  )
}

export default App
