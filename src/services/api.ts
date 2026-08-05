import axios, { AxiosInstance } from 'axios'
import { API_ENDPOINTS } from './constants'
import { ChatResponse, Conversation, Session, GraphData, UploadResponse, LawyerInfo } from '../types'

const apiClient: AxiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const apiService = {
  // Chat endpoints
  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    const response = await apiClient.post(API_ENDPOINTS.CHAT.SEND, {
      message,
      session_id: sessionId,
    })
    return response.data
  },

  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get(API_ENDPOINTS.CHAT.HISTORY)
    return response.data
  },

  async getSessions(): Promise<Session[]> {
    const response = await apiClient.get(API_ENDPOINTS.CHAT.SESSIONS)
    return response.data
  },

  // Upload endpoints
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD.FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Graph endpoints
  async getGraphNodes(): Promise<GraphData> {
    const response = await apiClient.get(API_ENDPOINTS.GRAPH.NODES)
    return response.data
  },

  async searchGraph(entity: string): Promise<Record<string, unknown>> {
    const response = await apiClient.post(API_ENDPOINTS.GRAPH.SEARCH, { entity })
    return response.data
  },

  // Lawyer endpoints
  async findLawyers(location: string): Promise<{ lawyers: LawyerInfo[]; legal_aid: LawyerInfo[] }> {
    const response = await apiClient.get(API_ENDPOINTS.LAWYERS.FIND(location))
    return response.data
  },
}

export default apiClient
