import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'

// use tanstack query 

import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import router from './router/router.jsx'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
        <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
