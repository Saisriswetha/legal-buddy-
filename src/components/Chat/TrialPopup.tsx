interface TrialPopupProps {
  onClose: () => void
}

export const TrialPopup = ({ onClose }: TrialPopupProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gold-400 mb-3">
          Free Trial Complete
        </h2>
        <p className="text-gray-300 mb-6">
          Your free trial of 5 messages has ended. Come back after sometime to continue using the service.
        </p>
        <button
          onClick={onClose}
          className="btn-gold w-full justify-center"
        >
          Got It
        </button>
      </div>
    </div>
  )
}
