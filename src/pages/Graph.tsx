import { useState, useEffect } from 'react'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'
import { ErrorMessage } from '../components/Common/ErrorMessage'
import { Background } from '../components/Layout/Background'
import { GlassNav } from '../components/Layout/GlassNav'
import { apiService } from '../services/api'
import { authService } from '../services/auth'
import { GraphData, User } from '../types'

export const Graph = () => {
  const [user, setUser] = useState<User | null>(null)
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    loadGraphData()
  }, [])

  const loadGraphData = async () => {
    try {
      setIsLoading(true)
      const data = await apiService.getGraphNodes()
      setGraphData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load graph')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      const results = await apiService.searchGraph(searchQuery)
      setSearchResults(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gold-400 mb-2">
              Legal Knowledge Graph
            </h1>
            <p className="text-gray-300">
              Explore connections between legal concepts, regulations, and related topics
            </p>
          </div>

          {error && (
            <ErrorMessage
              message={error}
              onDismiss={() => setError('')}
            />
          )}

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a legal concept (e.g., OPT, H-1B, visa)..."
                className="glass-input flex-1"
              />
              <button type="submit" className="btn-gold">
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searchResults && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 glass-panel p-6">
                <h2 className="text-xl font-semibold text-gold-400 mb-4">
                  Entity Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm">
                      {JSON.stringify(searchResults, null, 2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h2 className="text-xl font-semibold text-gold-400 mb-4">
                  Related Topics
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">
                    See related legal concepts and regulations connected to your search.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Graph Overview */}
          {graphData && (
            <div className="glass-panel p-6 overflow-y-auto max-h-96">
              <h2 className="text-xl font-semibold text-gold-400 mb-6 sticky top-0 bg-black/20 backdrop-blur -mx-6 px-6 py-3">
                Graph Overview
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-panel p-4 border-gold-400/30">
                  <div className="text-2xl font-bold text-gold-400">
                    {graphData.nodes.length}
                  </div>
                  <div className="text-sm text-gray-400">Legal Entities</div>
                </div>
                <div className="glass-panel p-4 border-gold-400/30">
                  <div className="text-2xl font-bold text-gold-400">
                    {graphData.edges.length}
                  </div>
                  <div className="text-sm text-gray-400">Relationships</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="font-semibold text-gray-100 mb-4">Key Concepts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {graphData.nodes.slice(0, 10).map((node) => (
                    <div
                      key={node.id}
                      className="glass-panel p-4 border-gold-400/20 hover:border-gold-400/50 transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-gray-100">{node.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{node.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {graphData.nodes.length > 10 && (
                <p className="mt-4 text-center text-gray-400 text-sm">
                  And {graphData.nodes.length - 10} more concepts...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
