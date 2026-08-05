import axios from 'axios'
import { API_ENDPOINTS } from './constants'
import { User, AuthToken } from '../types'

const authAPI = axios.create({
  withCredentials: true,
})

export const authService = {
  async loginWithGoogle(code: string): Promise<AuthToken> {
    try {
      const response = await authAPI.post(`${API_ENDPOINTS.AUTH.CALLBACK}?code=${code}`)
      console.log('Auth response:', response.data)
      
      // Store token in localStorage
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
      }
      
      return response.data
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    }
  },
  
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await authAPI.get(API_ENDPOINTS.AUTH.ME)
      return response.data
    } catch (error) {
      return null
    }
  },
  
  async logout(): Promise<void> {
    try {
      await authAPI.post(API_ENDPOINTS.AUTH.LOGOUT)
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  },
  
  getStoredUser(): User | null {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  },
  
  setStoredUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  },
  
  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  },
  
  isAuthenticated(): boolean {
    return !!this.getStoredUser() && !!this.getAccessToken()
  },
  
  redirectToGoogleLogin(): void {
    window.location.href = API_ENDPOINTS.AUTH.GOOGLE
  },
}