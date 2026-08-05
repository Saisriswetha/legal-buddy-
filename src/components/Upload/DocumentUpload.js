import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
export const DocumentUpload = ({ onUpload, isLoading }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
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
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };
    const handleFile = (file) => {
        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
            onUpload(file);
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
    return (_jsxs("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, className: `border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${dragActive
            ? 'border-gold-400 bg-gold-600/10'
            : 'border-white/20 hover:border-gold-400/50'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`, children: [_jsx("input", { ref: inputRef, type: "file", onChange: handleChange, accept: ".pdf,.jpg,.jpeg,.png", disabled: isLoading, className: "hidden" }), _jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDCC4" }), _jsx("h3", { className: "text-lg font-semibold text-gold-400 mb-1", children: "Upload legal documents" }), _jsx("p", { className: "text-sm text-gray-300 mb-4", children: "Drag and drop your PDF or image, or click to browse" }), _jsx("button", { onClick: () => inputRef.current?.click(), disabled: isLoading, className: "btn-gold-sm disabled:opacity-50", children: "Choose file" })] }));
};
