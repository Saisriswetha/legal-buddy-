import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatBubble } from '../components/Chat/ChatBubble'
import { ChatInput } from '../components/Chat/ChatInput'
import { UploadPopover } from '../components/Chat/UploadPopover'
import { TrialPopup } from '../components/Chat/TrialPopup'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'
import { ErrorMessage } from '../components/Common/ErrorMessage'
import { Background } from '../components/Layout/Background'
import { GlassNav } from '../components/Layout/GlassNav'
import { apiService } from '../services/api'
import { authService } from '../services/auth'
import { ChatResponse, User } from '../types'

interface Message {
  type: 'user' | 'assistant'
  text: string
  response?: ChatResponse
}

export const Chat = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [showUploadPopover, setShowUploadPopover] = useState(false)
  const [showTrialPopup, setShowTrialPopup] = useState(false)
  const [trialExhausted, setTrialExhausted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (trialExhausted) return

    setError('')
    setMessages((prev) => [...prev, { type: 'user', text: message }])
    setIsLoading(true)

    try {
      const response = await apiService.sendMessage(message, sessionId)

      if (!sessionId && response) {
        const newSessionId = `session-${Date.now()}`
        setSessionId(newSessionId)
      }

      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          text: response.answer,
          response: response,
        },
      ])

      if (response.messages_used === 5) {
        setShowTrialPopup(true)
      }
    } catch (err: any) {
      if (err.response?.data?.detail?.error === 'trial_expired') {
        setTrialExhausted(true)
        navigate('/trial-ended')
        return
      }
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMsg)
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (trialExhausted) return

    setError('')
    setIsLoading(true)

    try {
      const response = await apiService.uploadFile(file)

      const message = `I have a legal document to analyze: "${file.name}"\n\nExtracted content:\n${response.extracted_text.substring(0, 500)}...`

      setMessages((prev) => [...prev, { type: 'user', text: message }])

      const chatResponse = await apiService.sendMessage(message, sessionId)

      if (!sessionId) {
        const newSessionId = `session-${Date.now()}`
        setSessionId(newSessionId)
      }

      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          text: chatResponse.answer,
          response: chatResponse,
        },
      ])

      if (chatResponse.messages_used === 5) {
        setShowTrialPopup(true)
      }
    } catch (err: any) {
      if (err.response?.data?.detail?.error === 'trial_expired') {
        setTrialExhausted(true)
        navigate('/trial-ended')
        return
      }
      const errorMsg = err instanceof Error ? err.message : 'Failed to upload file'
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Background />
      {user && <GlassNav user={user} />}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Hero greeting */}
          {messages.length === 0 && (
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-gold-400 mb-2">
                Greetings, {user?.name || 'there'}!
              </h2>
              <p className="text-gray-300">
                Ask me anything about US legal matters
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              type={msg.type}
              message={msg.text}
              response={msg.response}
            />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="glass-panel px-4 py-3">
                <LoadingSpinner size="sm" />
              </div>
            </div>
          )}

          {error && (
            <ErrorMessage
              message={error}
              onDismiss={() => setError('')}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      {!trialExhausted && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10 py-4 px-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={() => setShowUploadPopover(true)}
              isLoading={isLoading || trialExhausted}
              disabled={trialExhausted}
            />
          </div>
        </div>
      )}

      {/* Upload popover */}
      <UploadPopover
        onUpload={handleFileUpload}
        isLoading={isLoading}
        isOpen={showUploadPopover}
        onClose={() => setShowUploadPopover(false)}
      />

      {/* Trial popup */}
      {showTrialPopup && (
        <TrialPopup
          onClose={() => {
            setShowTrialPopup(false)
            navigate('/trial-ended')
          }}
        />
      )}
    </div>
  )
}
