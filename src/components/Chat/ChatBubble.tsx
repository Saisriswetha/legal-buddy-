import { ChatResponse } from '../../types'
import { SourceCitation } from './SourceCitation'

interface ChatBubbleProps {
  type: 'user' | 'assistant'
  message: string
  response?: ChatResponse
}

export const ChatBubble = ({ type, message, response }: ChatBubbleProps) => {
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4 animate-slide-up">
        <div className="chat-bubble-user">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div className="chat-bubble-assistant">
        <p className="text-sm mb-3 text-gray-100">{response?.answer || message}</p>

        {response && (
          <>
            {response.sources && response.sources.length > 0 && (
              <SourceCitation sources={response.sources} />
            )}

            {response.confidence_score !== undefined && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  Confidence: {Math.round(response.confidence_score * 100)}%
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
