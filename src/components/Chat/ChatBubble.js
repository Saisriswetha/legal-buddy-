import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SourceCitation } from './SourceCitation';
export const ChatBubble = ({ type, message, response }) => {
    if (type === 'user') {
        return (_jsx("div", { className: "flex justify-end mb-4 animate-slide-up", children: _jsx("div", { className: "chat-bubble-user", children: _jsx("p", { className: "text-sm", children: message }) }) }));
    }
    return (_jsx("div", { className: "flex justify-start mb-4 animate-slide-up", children: _jsxs("div", { className: "chat-bubble-assistant", children: [_jsx("p", { className: "text-sm mb-3 text-gray-100", children: response?.answer || message }), response && (_jsxs(_Fragment, { children: [response.sources && response.sources.length > 0 && (_jsx(SourceCitation, { sources: response.sources })), response.confidence_score !== undefined && (_jsx("div", { className: "mt-3 pt-3 border-t border-white/10", children: _jsxs("p", { className: "text-xs text-gray-400", children: ["Confidence: ", Math.round(response.confidence_score * 100), "%"] }) }))] }))] }) }));
};
