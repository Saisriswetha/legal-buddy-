import { jsx as _jsx } from "react/jsx-runtime";
export const LoadingSpinner = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx("div", { className: `${sizeClasses[size]} border-4 border-white/20 border-t-gold-400 rounded-full animate-spin` }) }));
};
