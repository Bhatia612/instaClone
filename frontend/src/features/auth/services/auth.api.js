import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
    withCredentials: true
})


export async function register(username, email, password) {
    const response = await api.post("/register", {
        username, email, password
    })
    return response.data

}

export async function login(usernameOrEmail, password) {
    const response = await api.post("/login", {
        usernameOrEmail, password
    })
    return response.data

}

export async function logout() {
    const response = await api.post("/logout")
    return response.data
}

export async function getMe() {
    const response = await api.get("/me")
    return response.data
}