import { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await handleLogin(usernameOrEmail, password)
      navigate("/feed")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed, please try again")
    }
  }

  return (

    <main>
      <div className="form-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            onChange={e => { setUsernameOrEmail(e.target.value) }}
            value={usernameOrEmail}
            type="text"
            name="usernameOrEmail"
            id="usernameOrEmail"
            placeholder='Enter your username or email' />
          <input
            onChange={e => { setPassword(e.target.value) }}
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder='Enter your password' />
          <button className='button primary-button' type='submit'>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Already have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login