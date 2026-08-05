import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { authService } from '../services/auth'

export const Home = () => {
  const navigate = useNavigate()
  const isAuthenticated = authService.isAuthenticated()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authenticated = urlParams.get('authenticated')

    if (authenticated === 'true') {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Legal Buddy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get instant answers to US legal questions for international students
          </p>
          {isAuthenticated ? (
            <Link
              to="/chat"
              className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Chatting
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In with Google
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visa & Immigration</h3>
            <p className="text-gray-600">
              Get answers about OPT, H-1B, F-1 visas, green cards, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Traffic & Fines</h3>
            <p className="text-gray-600">
              Understand traffic tickets, tolls, fines, and penalty payments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Housing & Contracts</h3>
            <p className="text-gray-600">
              Navigate lease agreements, tenant rights, and housing law.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Employment Law</h3>
            <p className="text-gray-600">
              Learn about work permits, employment rights, and tax obligations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Issues</h3>
            <p className="text-gray-600">
              Get guidance on disputes, legal aid, and when to hire a lawyer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Graph</h3>
            <p className="text-gray-600">
              Explore connections between legal concepts and regulations.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Ask a Question</h3>
              <p className="text-gray-600">
                Type your legal question about immigration, traffic, housing, or employment.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Get AI-Powered Answers</h3>
              <p className="text-gray-600">
                Receive instant answers backed by official government sources and legal knowledge.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Find Legal Help</h3>
              <p className="text-gray-600">
                Access nearby legal aid organizations and lawyer recommendations when needed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Legal Disclaimer</h2>
          <p className="text-gray-700">
            This application provides general information only and does not constitute legal advice.
            For specific legal matters, please consult with a qualified attorney. Always verify
            information with official government sources (USCIS, state courts, etc.).
          </p>
        </div>
      </div>
    </div>
  )
}
