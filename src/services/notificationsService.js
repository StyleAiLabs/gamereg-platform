import apiClient from '../utils/apiClient';

const notificationsService = {
    getNotifications: async () => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get('/notifications');
            // return response.data;

            // For development, return mock data
            const mockNotifications = [
                {
                    id: 1,
                    title: 'Welcome to Game Platform',
                    message: 'Thank you for registering! Explore available games and join a group to get started.',
                    type: 'SYSTEM',
                    is_read: false,
                    created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
                },
                {
                    id: 2,
                    title: 'New Game Available',
                    message: 'A new game "Leadership Challenge" has been added. Check it out!',
                    type: 'GAME',
                    is_read: false,
                    created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
                },
                {
                    id: 3,
                    title: 'Group Invitation',
                    message: 'You have been invited to join the "Team Alpha" group for Strategy Game.',
                    type: 'GROUP',
                    is_read: true,
                    created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
                }
            ];

            return mockNotifications;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
        }
    },

    markAsRead: async (notificationId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post(`/notifications/${notificationId}/read`);
            // return response.data;

            // For development, just return success
            return { success: true };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
        }
    },

    markAllAsRead: async () => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post('/notifications/read-all');
            // return response.data;

            // For development, just return success
            return { success: true };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
        }
    },
};

export default notificationsService;