import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TrialPopup = ({ onClose }) => {
    return (_jsx("div", { className: "modal-overlay", children: _jsxs("div", { className: "modal-content", children: [_jsx("div", { className: "text-5xl mb-4", children: "\uD83D\uDD12" }), _jsx("h2", { className: "text-2xl font-bold text-gold-400 mb-3", children: "Free Trial Complete" }), _jsx("p", { className: "text-gray-300 mb-6", children: "Your free trial of 5 messages has ended. Come back after sometime to continue using the service." }), _jsx("button", { onClick: onClose, className: "btn-gold w-full justify-center", children: "Got It" })] }) }));
};
