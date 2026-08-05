import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
export const UserMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 px-4 py-2 rounde\nd-full hover:bg-amber-600/20 transition-all duration-300 te\nxt-amber-400 hover:text-amber-300", children: user.profile_pic ? (_jsx("img", { src: user.profile_pic, alt: user.name, className: "w-7 h-7 rounded-full border border-a\nmber-400/50 transition-all duration-300" })) : (_jsx("i", { className: "fa-solid fa-circle-user text-2xl text-amber-400" })) }), isOpen && (_jsxs("div", { className: "absolute top-full right-0 mt-2 w-48 glass-panel z-50", children: [_jsxs("div", { className: "p-3 border-b border-white/10", children: [_jsx("p", { className: "text-sm font-medium text-gold-400", children: user.name }), _jsx("p", { className: "text-xs text-gray-400", children: user.email })] }), _jsx("button", { onClick: handleLogout, className: "w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors", children: "Logout" })] }))] }));
};
