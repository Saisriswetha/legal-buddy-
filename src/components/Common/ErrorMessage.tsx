interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  return (
    <div className="glass-panel border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 flex justify-between items-center">
      <span className="text-sm">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300 font-bold ml-4"
        >
          ×
        </button>
      )}
    </div>
  )
}
