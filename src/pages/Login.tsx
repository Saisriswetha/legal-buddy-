import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authService } from '../services/auth'
import { Background } from '../components/Layout/Background'
import { API_URL } from '../services/constants'

export const Login = () => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (authService.isAuthenticated()) {
    return <Navigate to="/chat" replace />
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const authenticated = urlParams.get('authenticated')

    if (code) {
      setIsLoading(true)
      authService
        .loginWithGoogle(code)
        .then((authToken) => {
          if (authToken.user) {
            authService.setStoredUser(authToken.user)
          }
          window.history.replaceState({}, document.title, window.location.pathname)
          window.location.href = '/chat'
        })
        .catch((error) => {
          console.error('Login failed:', error)
          setIsLoading(false)
          window.history.replaceState({}, document.title, window.location.pathname)
        })
    } else if (authenticated === 'true') {
      setIsLoading(true)
      authService
        .getCurrentUser()
        .then((user) => {
          if (user) {
            authService.setStoredUser(user)
          }
          window.location.href = '/chat'
        })
        .catch(() => {
          setIsLoading(false)
          window.history.replaceState({}, document.title, window.location.pathname)
        })
    }
  }, [])

  const handleGoogleLogin = () => {
    setIsLoading(true)
    window.location.href = `${API_URL}/api/auth/google`
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center px-4">
      <Background />

      <div className="glass-panel-lg p-12 max-w-md w-full animate-fade-in">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold-400 mb-2">Legal Buddy</h1>
          <p className="text-gray-300">Your one stop for LEGAL help  </p>
        </div>

        {/* Name input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="glass-input w-full"
          />
        </div>

        {/* Google login button */}
        <button
          onClick={handleGoogleLogin}
          disabled={!name.trim() || isLoading}
          className="btn-gold w-full justify-center mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Login to Continue
        </button>

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-400 space-y-2">
          <p>We use Google sign-in to keep your account secure</p>
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
