import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/posts.context'
import { ThemeProvider } from './features/shared/theme.context'


function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <PostContextProvider>
          <RouterProvider router={router} />

        </PostContextProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
