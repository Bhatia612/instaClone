import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { register } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response.user)
        }
        catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        user, loading, handleRegister
    }
}