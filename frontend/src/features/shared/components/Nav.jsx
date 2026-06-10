import React from 'react'
import { useNavigate } from 'react-router'

function Nav() {

  const navigate = useNavigate()
  return (
    <div className="nav">
      <h2>Instagram</h2>
      <button onClick={() => {
        navigate("/create-post")
      }} className='button primary-button'>Create post</button>
    </div>
  )
}

export default Nav