import { useState, useEffect } from 'react'
import { LoadingSpinner } from '../components/Common/LoadingSpinner'
import { ErrorMessage } from '../components/Common/ErrorMessage'
import { Background } from '../components/Layout/Background'
import { GlassNav } from '../components/Layout/GlassNav'
import { apiService } from '../services/api'
import { authService } from '../services/auth'
import { LawyerInfo, User } from '../types'

export const Lawyers = () => {
  const [user, setUser] = useState<User | null>(null)
  const [location, setLocation] = useState('')
  const [lawyers, setLawyers] = useState<LawyerInfo[]>([])
  const [legalAid, setLegalAid] = useState<LawyerInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location.trim()) return

    try {
      setIsLoading(true)
      setError('')
      const data = await apiService.findLawyers(location)
      setLawyers(data.lawyers)
      setLegalAid(data.legal_aid)
      setSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find lawyers')
    } finally {
      setIsLoading(false)
    }
  }

  const LawyerCard = ({ lawyer }: { lawyer: LawyerInfo }) => (
    <div className="glass-panel p-6 hover:border-gold-400/50 transition-colors">
      <h3 className="text-lg font-semibold text-gold-400 mb-2">
        {lawyer.organization}
      </h3>

      <div className="space-y-3 text-sm text-gray-300 mb-4">
        {lawyer.specialization && (
          <div>
            <span className="font-medium text-gold-400">Specialization:</span>{' '}
            {lawyer.specialization}
          </div>
        )}
        {lawyer.cost && (
          <div>
            <span className="font-medium text-gold-400">Cost:</span> {lawyer.cost}
          </div>
        )}
        {lawyer.contact && (
          <div>
            <span className="font-medium text-gold-400">Contact:</span>{' '}
            {lawyer.contact}
          </div>
        )}
      </div>

      {lawyer.website && (
        <a
          href={lawyer.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block btn-gold-sm"
        >
          Visit Website
        </a>
      )}
    </div>
  )

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Background />
      {user && <GlassNav user={user} />}

      <div className="flex-1 overflow-y-auto pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gold-400 mb-2">Find Legal Help</h1>
            <p className="text-gray-300">
              Find lawyers and legal aid organizations in your area
            </p>
          </div>

          {error && (
            <ErrorMessage
              message={error}
              onDismiss={() => setError('')}
            />
          )}

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-8 glass-panel p-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or state (e.g., New York, CA, Boston)..."
                className="glass-input flex-1"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {searched && !isLoading && (
            <>
              {legalAid.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gold-400 mb-6">
                    Legal Aid Organizations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {legalAid.map((org, idx) => (
                      <LawyerCard key={idx} lawyer={org} />
                    ))}
                  </div>
                </div>
              )}

              {lawyers.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gold-400 mb-6">
                    Private Lawyers
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lawyers.map((lawyer, idx) => (
                      <LawyerCard key={idx} lawyer={lawyer} />
                    ))}
                  </div>
                </div>
              )}

              {lawyers.length === 0 && legalAid.length === 0 && (
                <div className="glass-panel p-8 text-center">
                  <p className="text-gray-300 mb-4">
                    No lawyers or legal aid found for "{location}"
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try searching with a different city or state
                  </p>
                </div>
              )}
            </>
          )}

          {!searched && (
            <div className="glass-panel p-12 text-center">
              <div className="text-6xl mb-4">⚖️</div>
              <h2 className="text-2xl font-semibold text-gold-400 mb-2">
                Find Legal Professionals Near You
              </h2>
              <p className="text-gray-300">
                Enter your location to find lawyers and legal aid organizations
              </p>
            </div>
          )}

          <div className="mt-12 glass-panel border-gold-400/30 p-6">
            <h3 className="font-semibold text-gold-400 mb-3">
              💡 Types of Legal Help
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                •{' '}
                <strong className="text-gold-400">Legal Aid:</strong> Free or
                low-cost services for those who qualify
              </li>
              <li>
                •{' '}
                <strong className="text-gold-400">Immigration Lawyers:</strong>{' '}
                Specialize in visa, green card, and naturalization matters
              </li>
              <li>
                •{' '}
                <strong className="text-gold-400">Employment Lawyers:</strong>{' '}
                Handle work disputes, discrimination, and visas
              </li>
              <li>
                •{' '}
                <strong className="text-gold-400">Personal Injury:</strong> Help
                with accidents, traffic cases, and negligence claims
              </li>
              <li>
                •{' '}
                <strong className="text-gold-400">Tenant Rights:</strong>{' '}
                Assistance with lease disputes and housing issues
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
