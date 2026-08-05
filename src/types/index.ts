export interface User {
  id: string
  email: string
  name: string
  profile_pic?: string
}

export interface Source {
  title: string
  url: string
  agency: string
  confidence: number
  retrieved_chunk: string
}

export interface ChatResponse {
  answer: string
  sources: Source[]
  confidence_score: number
  messages_used?: number
  messages_remaining?: number
  trial_expired?: boolean
}

export interface LawyerInfo {
  organization: string
  contact: string
  website: string
  specialization: string
  cost: string
}

export interface Conversation {
  id: string
  session_id: string
  user_id: string
  message: string
  response: ChatResponse
  created_at: string
}

export interface Session {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface GraphNode {
  id: string
  label: string
  type: string
  properties: Record<string, unknown>
}

export interface GraphEdge {
  source: string
  target: string
  type: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface UploadResponse {
  extracted_text: string
  detected_type: string
}

export interface AuthToken {
  access_token: string
  token_type: string
  user: User
}
