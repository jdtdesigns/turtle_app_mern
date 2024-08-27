import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      message
      user {
        _id
        username
      }
    }
  }
`

const initialFormData = {
  username: '',
  email: '',
  password: '',
  errorMessage: '',
  isLogin: true
}

function AuthForm(props) {
  const [formData, setFormData] = useState(initialFormData)
  const [loginUser] = useMutation(LOGIN_USER, {
    variables: formData
  })
  const navigate = useNavigate()

  const toggleAuthState = (newValue) => {
    setFormData({
      ...formData,
      isLogin: newValue
    })
  }

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await loginUser()

      props.setUser(res.data.loginUser.user)
      navigate('/dashboard')
    } catch (error) {
      console.log(res)
      setFormData({
        ...formData,
        errorMessage: error.message
      })
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit} className="column">
        <h2 className="text-center">{formData.isLogin ? 'Log In' : 'Register'}</h2>

        {formData.errorMessage && <p className="error-message text-center">{formData.errorMessage}</p>}

        {!formData.isLogin && <input onChange={handleInputChange} name="username" type="text" placeholder="Enter your username" />}
        <input onChange={handleInputChange} name="email" type="email" placeholder="Enter your email address" autoComplete="email" />
        <input onChange={handleInputChange} name="password" type="password" placeholder="Enter your password" autoComplete="current-password" />

        <button>Submit</button>

        {formData.isLogin ? (
          <p className="text-center">Need an Account? <span onClick={() => toggleAuthState(false)}>Click Here</span></p>
        ) : (
          <p className="text-center">Already Registered? <span onClick={() => toggleAuthState(true)}>Click Here</span></p>
        )}
      </form>
    </>
  )
}

export default AuthForm