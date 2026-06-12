import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";

import { useAuth } from "./features/auth/hooks/useAuth"

function ProtectedRoute() {
    const { user } = useAuth()
    return user ? <Outlet /> : <Navigate to="/login" />
}

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/feed" /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/feed", element: <Feed /> },
            { path: "/create-post", element: <CreatePost /> }
        ]

    },
    { path: "*", element: <h2>404 - Page not found</h2> }
])