import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { register, login } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { user, setUser, loading, setLoading } = context

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response.user)
        } finally {
            setLoading(false)
        }
    }


    const handleLogin = async (usernameOrEmail, password) => {
        setLoading(true)

        try {
            const response = await login(usernameOrEmail, password)
            setUser(response.user)

        } finally {
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    return {
        user, loading, handleRegister, handleLogin, handleLogout
    }
}