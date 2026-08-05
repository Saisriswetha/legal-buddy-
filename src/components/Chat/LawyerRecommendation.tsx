import { LawyerInfo } from '../../types'

interface LawyerRecommendationProps {
  lawyer: LawyerInfo
}

export const LawyerRecommendation = ({ lawyer }: LawyerRecommendationProps) => {
  return (
    <div className="mt-3 pt-3 border-t border-white/10 bg-gold-600/10 -mx-4 -mb-3 px-4 py-3 rounded-b-lg">
      <div className="flex items-start gap-2">
        <span className="text-lg">⚠️</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gold-400">
            We recommend consulting with a lawyer
          </p>
          <div className="mt-2 space-y-1 text-xs text-gray-300">
            <p><strong className="text-gold-400">{lawyer.organization}</strong></p>
            {lawyer.contact && <p>📞 {lawyer.contact}</p>}
            {lawyer.website && (
              <p>
                <a
                  href={lawyer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 hover:underline"
                >
                  {lawyer.website}
                </a>
              </p>
            )}
            <p>Specialization: {lawyer.specialization}</p>
            <p>Cost: {lawyer.cost}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
