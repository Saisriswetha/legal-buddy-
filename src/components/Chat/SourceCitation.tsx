import { Source } from '../../types'

interface SourceCitationProps {
  sources: Source[]
}

export const SourceCitation = ({ sources }: SourceCitationProps) => {
  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <p className="text-xs font-semibold text-gold-400 mb-2">Sources:</p>
      <div className="space-y-2">
        {sources.map((source, idx) => (
          <div key={idx} className="text-xs text-gray-300">
            <div className="flex items-start gap-2">
              <span className="font-medium text-gold-400">[{idx + 1}]</span>
              <div className="flex-1">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 hover:underline"
                  >
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                <p className="text-gray-400 mt-1">
                  {source.agency} • {Math.round(source.confidence * 100)}% match
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
