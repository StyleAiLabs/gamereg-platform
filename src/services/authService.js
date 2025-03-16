import apiClient from '../utils/apiClient';

const authService = {
    register: async (userData) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/auth/register', userData);
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Registration successful! Check your email for verification.' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to register');
        }
    },

    login: async (credentials) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/auth/login', credentials);
            // return response.data;

            // For development, return mock user data
            return {
                user: {
                    id: 1,
                    first_name: 'Demo',
                    last_name: 'User',
                    email: credentials.email,
                    mobile: '1234567890',
                    is_admin: false,
                    is_verified: true,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTY4NzE4ODAxNiwiZXhwIjoxNjg3Mjc0NDE2fQ.mock-token'
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    },

    logout: () => {
        // Clear any local state or tokens if needed
        console.log('User logged out');
    },

    forgotPassword: async (email) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/auth/forgot-password', { email });
            // return response.data;

            // For development, just return success
            return { success: true, message: 'If that email exists, a reset link has been sent.' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to process request');
        }
    },

    resetPassword: async (token, password) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/auth/reset-password', { token, password });
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Password reset successful!' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to reset password');
        }
    },

    verifyEmail: async (token) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/auth/verify-email', { token });
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Email verified successfully!' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to verify email');
        }
    },
};

export default authService;