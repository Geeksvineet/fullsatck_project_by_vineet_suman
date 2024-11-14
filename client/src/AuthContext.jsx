import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext with default values
const AuthContext = createContext();

// Provider component to wrap the app and provide auth state
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Function to check if a valid token exists in sessionStorage
    const checkAuthentication = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            // If token exists, validate it by checking if it's expired (optional)
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    // Function to log in
    const login = () => {
        setIsAuthenticated(true);
        navigate('/admin'); // Redirect to the dashboard after login
    };

    // Function to log out
    const logout = () => {
        sessionStorage.removeItem('token'); // Clear the token
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page after logout
    };

    // Check for authentication on initial load
    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext values
export function useAuth() {
    return useContext(AuthContext);
}
