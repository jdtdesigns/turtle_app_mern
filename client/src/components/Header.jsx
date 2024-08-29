import { NavLink, useNavigate } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/client'

import { LOGOUT_USER } from '../graphql/mutations'

function Header(props) {
  const navigate = useNavigate()
  const client = useApolloClient()
  const [logoutUser] = useMutation(LOGOUT_USER)

  const handleLogout = async () => {
    await logoutUser()
    await props.setUser(null)

    client.clearStore()

    navigate('/')
  }

  return (
    <header className="row justify-between align-center">
      <NavLink to="/">
        <h3>Cowabunga</h3>
      </NavLink>

      {props.user ? (
        <div className="row align-center">
          <p>Welcome, {props.user.username}</p>
          <NavLink className="dashboard-link" to="/dashboard">Dashboard</NavLink>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/auth">Log In or Register</NavLink>
        </nav>
      )}
    </header>
  )
}

export default Header