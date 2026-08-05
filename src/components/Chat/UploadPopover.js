import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
export const UploadPopover = ({ onUpload, isLoading, isOpen, onClose, }) => {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    const handleFile = (file) => {
        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
            onUpload(file);
            onClose?.();
        }
        else {
            alert('Please upload a PDF or image file');
        }
    };
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };
    if (!isOpen) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 z-50 pointer-events-none", children: _jsx("div", { className: "modal-overlay pointer-events-auto", onClick: onClose, children: _jsx("div", { className: "glass-panel-lg p-8 max-w-md pointer-events-auto animate-fade-in", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-5xl mb-4", children: "\uD83D\uDCC4" }), _jsx("h3", { className: "text-xl font-bold text-gold-400 mb-2", children: "Upload Document" }), _jsx("p", { className: "text-gray-300 text-sm mb-6", children: "Upload a PDF or ticket image for analysis" }), _jsxs("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => inputRef.current?.click(), className: `border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${dragActive
                                ? 'border-gold-400 bg-gold-600/10'
                                : 'border-white/20 hover:border-gold-400/50'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`, children: [_jsx("input", { ref: inputRef, type: "file", onChange: handleChange, accept: ".pdf,.jpg,.jpeg,.png", disabled: isLoading, className: "hidden" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Drag and drop or click to browse" })] }), _jsx("button", { onClick: onClose, className: "mt-6 btn-glass w-full", children: "Cancel" })] }) }) }) }));
};
