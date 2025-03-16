import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { user, token, login, logout, register, forgotPassword, resetPassword, verifyEmail, loading, error } = useAuthStore();

    // Check token expiration (in a real app)
    useEffect(() => {
        if (token) {
            try {
                // In a real app, this would verify the token's expiration
                // For demo purposes, we're not actually validating anything

                // const decodedToken = jwt_decode(token);
                // const currentTime = Date.now() / 1000;
                // if (decodedToken.exp < currentTime) {
                //   logout();
                // }
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
        forgotPassword,
        resetPassword,
        verifyEmail,
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

export default useAuth;