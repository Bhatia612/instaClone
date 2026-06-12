import { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Register() {
    const { loading, handleRegister } = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister(username, email, password)
            navigate("/feed")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed, please try again")
        }

    }

    return (

        <main>
            <div className="form-container">
                <h1>Register</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={e => { setUsername(e.target.value) }}
                        value={username}
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Enter your username' />
                    <input
                        onChange={e => { setEmail(e.target.value) }}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email' />
                    <input
                        onChange={e => { setPassword(e.target.value) }}
                        value={password}
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