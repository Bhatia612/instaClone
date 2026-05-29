import React, { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function Register() {
    const { loading, handleRegister } = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleRegister(username, email, password)
        navigate("/")
    }

    return (

        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={e => { setUsername(e.target.value) }}
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Enter your username' />
                    <input
                        onInput={e => { setEmail(e.target.value) }}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email' />
                    <input
                        onInput={e => { setPassword(e.target.value) }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Enter your password' />
                    <button className='button primary-button' type='submit'>{loading ? "Creating user . . ." : "Register"}</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register