import { useNavigate } from 'react-router-dom'
import { Background } from '../components/Layout/Background'

export const TrialEnded = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center px-4">
      <Background />

      <div className="glass-panel-lg p-12 max-w-md w-full text-center animate-fade-in">
        <div className="text-6xl mb-6">🕐</div>

        <h1 className="text-3xl font-bold text-gold-400 mb-3">
          Come back after sometime
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Your free trial period has ended. Check back later to access the AI Legal Navigator again with a refreshed trial.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="btn-gold w-full justify-center"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
