import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    set({
                        user: response.user,
                        token: response.token,
                        loading: false
                    });
                    return response;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            register: async (userData) => {
                set({ loading: true, error: null });
                try {
                    const response = await authService.register(userData);
                    set({ loading: false });
                    return response;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            logout: () => {
                authService.logout();
                set({ user: null, token: null });
            },

            forgotPassword: async (email) => {
                set({ loading: true, error: null });
                try {
                    const response = await authService.forgotPassword(email);
                    set({ loading: false });
                    return response;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            resetPassword: async (token, password) => {
                set({ loading: true, error: null });
                try {
                    const response = await authService.resetPassword(token, password);
                    set({ loading: false });
                    return response;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            verifyEmail: async (token) => {
                set({ loading: true, error: null });
                try {
                    const response = await authService.verifyEmail(token);
                    set({ loading: false });
                    return response;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            }
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;