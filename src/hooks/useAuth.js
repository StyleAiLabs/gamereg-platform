import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { jwtDecode } from 'jwt-decode'; // Updated from import jwt_decode from 'jwt-decode'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { user, token, login, logout, register, loading, error } = useAuthStore();

    // Check token expiration
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    // Token has expired
                    logout();
                }
            } catch (error) {
                // Invalid token
                logout();
            }
        }
    }, [token, logout]);

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        loading,
        error,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};