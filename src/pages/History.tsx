import { useState, useEffect } from 'react'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'
import { ErrorMessage } from '../components/Common/ErrorMessage'
import { Background } from '../components/Layout/Background'
import { GlassNav } from '../components/Layout/GlassNav'
import { apiService } from '../services/api'
import { authService } from '../services/auth'
import { Conversation, Session, User } from '../types'

export const History = () => {
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    loadSessions()
  }, [])

  useEffect(() => {
    if (selectedSession) {
      loadConversations()
    }
  }, [selectedSession])

  const loadSessions = async () => {
    try {
      setIsLoading(true)
      const data = await apiService.getSessions()
      setSessions(data)
      if (data.length > 0) {
        setSelectedSession(data[0])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const loadConversations = async () => {
    try {
      const data = await apiService.getConversations()
      setConversations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations')
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Background />
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Background />
      {user && <GlassNav user={user} />}

      <div className="flex-1 overflow-y-auto pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gold-400 mb-8">Conversation History</h1>

          {error && (
            <ErrorMessage message={error} onDismiss={() => setError('')} />
          )}

          {sessions.length === 0 ? (
            <div className="glass-panel p-8 text-center">
              <p className="text-gray-300">
                No conversation history yet. Start chatting to see your history here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sessions sidebar */}
              <div className="lg:col-span-1">
                <div className="glass-panel overflow-y-auto max-h-96">
                  <div className="p-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur">
                    <h2 className="font-semibold text-gold-400">Sessions</h2>
                  </div>
                  <div className="divide-y divide-white/10">
                    {sessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={`w-full text-left px-4 py-3 transition-all ${
                          selectedSession?.id === session.id
                            ? 'bg-gold-600/20 border-l-4 border-gold-400'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="font-medium text-gray-100 truncate">
                          {session.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(session.updated_at).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversations */}
              <div className="lg:col-span-3">
                {selectedSession ? (
                  <div className="glass-panel p-6 overflow-y-auto max-h-96">
                    <h2 className="text-xl font-semibold text-gold-400 mb-6 sticky top-0 bg-black/20 backdrop-blur -mx-6 px-6 py-3">
                      {selectedSession.title}
                    </h2>

                    {conversations.length === 0 ? (
                      <p className="text-gray-300">No messages in this session.</p>
                    ) : (
                      <div className="space-y-4">
                        {conversations.map((conv, idx) => (
                          <div
                            key={idx}
                            className="border-b border-white/10 pb-4 last:border-b-0"
                          >
                            <div className="mb-2">
                              <div className="bg-gold-600/10 rounded-lg p-3 border border-gold-400/20">
                                <p className="text-gray-100 text-sm">{conv.message}</p>
                              </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                              <p className="text-gray-200 text-sm mb-2">
                                {conv.response.answer}
                              </p>

                              {conv.response.sources &&
                                conv.response.sources.length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-white/10 text-xs">
                                    <p className="font-semibold text-gold-400 mb-1">
                                      Sources:
                                    </p>
                                    <ul className="space-y-1">
                                      {conv.response.sources.map((source, i) => (
                                        <li key={i}>
                                          <a
                                            href={source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gold-400 hover:text-gold-300 hover:underline"
                                          >
                                            {source.title}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                            </div>

                            <div className="mt-2 text-xs text-gray-500">
                              {new Date(conv.created_at).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="glass-panel p-8 text-center">
                    <p className="text-gray-300">
                      Select a session to view conversations
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
