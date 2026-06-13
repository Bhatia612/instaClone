import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

function Nav() {
    const navigate = useNavigate()
    const { handleLogout } = useAuth()

    const onLogout = async () => {
        await handleLogout()
        navigate("/login")
    }

    return (
        <nav className="nav">
            <h2>Instagram</h2>
            <div className="nav-actions">
                <button onClick={() => navigate("/create-post")} className='button primary-button'>Create post</button>
                <button onClick={onLogout} className='button secondary-button'>Logout</button>
            </div>
        </nav>
    )
}

export default Nav