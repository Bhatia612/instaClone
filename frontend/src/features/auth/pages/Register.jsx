import React from 'react'
import "../styles/form.scss"
import { Link } from 'react-router'

function Register() {
    return (

        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Enter your username' />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email' />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Enter your password' />
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register