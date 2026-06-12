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
        <div className="nav">
            <h2>Instagram</h2>
            <div>
                <button onClick={() => navigate("/create-post")} className='button primary-button'>Create post</button>
                <button onClick={onLogout} className='button'>Logout</button>
            </div>
        </div>
    )
}

export default Nav