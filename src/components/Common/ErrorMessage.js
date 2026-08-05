import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ErrorMessage = ({ message, onDismiss }) => {
    return (_jsxs("div", { className: "glass-panel border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: message }), onDismiss && (_jsx("button", { onClick: onDismiss, className: "text-red-400 hover:text-red-300 font-bold ml-4", children: "\u00D7" }))] }));
};
