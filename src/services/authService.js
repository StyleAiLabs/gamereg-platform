import apiClient from '../utils/apiClient';

const authService = {
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to register');
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    },

    logout: () => {
        // Clear any local state or tokens if needed
    },

    forgotPassword: async (email) => {
        try {
            const response = await apiClient.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to process request');
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await apiClient.post('/auth/reset-password', { token, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to reset password');
        }
    },

    verifyEmail: async (token) => {
        try {
            const response = await apiClient.post('/auth/verify-email', { token });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to verify email');
        }
    },
};

export default authService;