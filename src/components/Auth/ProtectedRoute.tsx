import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { authService } from '../../services/auth'
import { LoadingSpinner } from '../Common/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = authService.getStoredUser()

      if (storedUser) {
        setIsAuthenticated(true)
        return
      }

      try {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          authService.setStoredUser(currentUser)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <LoadingSpinner size="lg" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
