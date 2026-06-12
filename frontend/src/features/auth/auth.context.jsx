import { createContext, useState, useEffect } from "react"
import { getMe } from "./services/auth.services"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        restoreUser()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )

}