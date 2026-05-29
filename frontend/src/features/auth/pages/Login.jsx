import React, { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { loading, handleLogin } = useAuth()

  const navigate = useNavigate()

  const [usernameOrEmail, setUsernameOrEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleLogin(usernameOrEmail, password)
    navigate("/")
  }

  return (

    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={e => { setUsernameOrEmail(e.target.value) }}
            type="text"
            name="usernameOrEmail"
            id="usernameOrEmail"
            placeholder='Enter your username or email' />
          <input
            onInput={e => { setPassword(e.target.value) }}
            type="password"
            name="password"
            id="password"
            placeholder='Enter your password' />
          <button className='button primary-button' type='submit'>{loading ? "Creating user . . ." : "Login"}</button>
        </form>
        <p>Already have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login