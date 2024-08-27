import { NavLink } from 'react-router-dom'


function Header(props) {
  console.log(props.user)

  return (
    <header className="row justify-between align-center">
      <h3>Cowabunga</h3>

      {props.user ? (
        <div className="row align-center">
          <p>Welcome, {props.user.username}</p>
          <button>Log Out</button>
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