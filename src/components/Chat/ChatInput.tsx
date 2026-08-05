import { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onFileUpload?: () => void
  isLoading?: boolean
  disabled?: boolean
}

export const ChatInput = ({
  onSendMessage,
  onFileUpload,
  isLoading,
  disabled,
}: ChatInputProps) => {
  const [message, setMessage] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {/* Upload button with tooltip */}
      <div className="relative">
        <button
          type="button"
          onClick={onFileUpload}
          disabled={isLoading || disabled}
          onPointerEnter={() => setShowTooltip(true)}
          onPointerLeave={() => setShowTooltip(false)}
          className="relative p-3 rounded-lg bg-white/10 hover:bg-gold-600/30 border border-white/20 hover:border-gold-400/50 text-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-ink-800 border border-gold-400/30 text-gold-400 text-xs font-medium px-3 py-1 rounded whitespace-nowrap pointer-events-none">
            Upload doc/ticket
          </div>
        )}
      </div>

      {/* Message input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a legal question..."
        disabled={isLoading || disabled}
        className="glass-input flex-1"
      />

      {/* Send button */}
      <button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className="btn-gold px-6"
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </form>
  )
}
