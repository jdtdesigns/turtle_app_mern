import { NavLink, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { LOGOUT_USER } from '../graphql/mutations'

function Header(props) {
  const navigate = useNavigate()
  const [logoutUser] = useMutation(LOGOUT_USER)

  const handleLogout = async () => {
    await logoutUser()
    await props.setUser(null)

    navigate('/')
  }

  return (
    <header className="row justify-between align-center">
      <h3>Cowabunga</h3>

      {props.user ? (
        <div className="row align-center">
          <p>Welcome, {props.user.username}</p>
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