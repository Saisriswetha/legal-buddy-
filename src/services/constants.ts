export const API_URL = import.meta.env.VITE_API_URL || 'https://legal-buddy.bshivasaidynamo.workers.dev'
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'AI Legal Navigator'

export const API_ENDPOINTS = {
  AUTH: {
    GOOGLE: `${API_URL}/api/auth/google`,
    CALLBACK: `${API_URL}/api/auth/callback`,
    ME: `${API_URL}/api/auth/me`,
    LOGOUT: `${API_URL}/api/auth/logout`,
  },
  CHAT: {
    SEND: `${API_URL}/api/chat/`,
    HISTORY: `${API_URL}/api/conversations`,
    SESSIONS: `${API_URL}/api/sessions`,
  },
  UPLOAD: {
    FILE: `${API_URL}/api/upload`,
  },
  GRAPH: {
    NODES: `${API_URL}/api/graph/nodes`,
    SEARCH: `${API_URL}/api/graph/search`,
  },
  LAWYERS: {
    FIND: (location: string) => `${API_URL}/api/lawyers/${location}`,
  },
}

export const VISA_CATEGORIES = [
  { value: 'opt', label: 'OPT (Optional Practical Training)' },
  { value: 'h1b', label: 'H-1B Visa' },
  { value: 'f1', label: 'F-1 Student Visa' },
  { value: 'green-card', label: 'Green Card' },
  { value: 'other', label: 'Other' },
]

export const LEGAL_CATEGORIES = [
  { value: 'visa', label: 'Visa & Immigration' },
  { value: 'traffic', label: 'Traffic Tickets' },
  { value: 'lease', label: 'Lease Agreements' },
  { value: 'employment', label: 'Employment Law' },
  { value: 'fines', label: 'Fines & Penalties' },
  { value: 'tolls', label: 'Tolls & Violations' },
  { value: 'general', label: 'General Legal' },
]
