import { useRef, useState } from 'react'

interface UploadPopoverProps {
  onUpload: (file: File) => void
  isLoading?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export const UploadPopover = ({
  onUpload,
  isLoading,
  isOpen,
  onClose,
}: UploadPopoverProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
      onUpload(file)
      onClose?.()
    } else {
      alert('Please upload a PDF or image file')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="modal-overlay pointer-events-auto" onClick={onClose}>
        <div
          className="glass-panel-lg p-8 max-w-md pointer-events-auto animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gold-400 mb-2">
              Upload Document
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Upload a PDF or ticket image for analysis
            </p>

            {/* Drag and drop zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${
                dragActive
                  ? 'border-gold-400 bg-gold-600/10'
                  : 'border-white/20 hover:border-gold-400/50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                ref={inputRef}
                type="file"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={isLoading}
                className="hidden"
              />
              <p className="text-gray-400 text-sm">
                Drag and drop or click to browse
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 btn-glass w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
