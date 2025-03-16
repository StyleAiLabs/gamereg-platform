import apiClient from '../utils/apiClient';

const notificationsService = {
    getNotifications: async () => {
        try {
            const response = await apiClient.get('/notifications');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
        }
    },

    markAsRead: async (notificationId) => {
        try {
            const response = await apiClient.post(`/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
        }
    },

    markAllAsRead: async () => {
        try {
            const response = await apiClient.post('/notifications/read-all');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
        }
    },
};

export default notificationsService;