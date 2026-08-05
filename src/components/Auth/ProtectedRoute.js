import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../../services/auth';
import { LoadingSpinner } from '../Common/LoadingSpinner';
export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = authService.getStoredUser();
            if (storedUser) {
                setIsAuthenticated(true);
                return;
            }
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    authService.setStoredUser(currentUser);
                    setIsAuthenticated(true);
                }
                else {
                    setIsAuthenticated(false);
                }
            }
            catch {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);
    if (isAuthenticated === null) {
        return _jsx(LoadingSpinner, { size: "lg" });
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
