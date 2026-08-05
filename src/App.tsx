import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import { TrialEnded } from './pages/TrialEnded'
import { authService } from './services/auth'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authenticated = urlParams.get('authenticated')

    const storedUser = authService.getStoredUser()

    // If authenticated parameter exists, fetch current user from backend
    if (authenticated === 'true' && !storedUser) {
      authService
        .getCurrentUser()
        .then((currentUser) => {
          if (currentUser) {
            authService.setStoredUser(currentUser)
          }
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      if (storedUser) {
        authService.getCurrentUser().then((currentUser) => {
          if (currentUser) {
            authService.setStoredUser(currentUser)
          }
        })
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-ink-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-gold-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trial-ended"
          element={
            <ProtectedRoute>
              <TrialEnded />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
