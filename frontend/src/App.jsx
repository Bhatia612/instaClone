import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/posts.context'


function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />

      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
