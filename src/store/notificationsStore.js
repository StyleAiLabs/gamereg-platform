import { create } from 'zustand';
import notificationsService from '../services/notificationsService';

const useNotificationsStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,

    // Fetch all notifications
    fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
            const notifications = await notificationsService.getNotifications();
            const unreadCount = notifications.filter(n => !n.is_read).length;
            set({
                notifications,
                unreadCount,
                loading: false
            });
            return notifications;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Mark a notification as read
    markAsRead: async (notificationId) => {
        try {
            await notificationsService.markAsRead(notificationId);

            // Update local state
            const notifications = get().notifications.map(notification =>
                notification.id === notificationId
                    ? { ...notification, is_read: true }
                    : notification
            );

            const unreadCount = notifications.filter(n => !n.is_read).length;
            set({ notifications, unreadCount });
        } catch (error) {
            set({ error: error.message });
            throw error;
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            await notificationsService.markAllAsRead();

            // Update local state
            const notifications = get().notifications.map(notification => ({
                ...notification,
                is_read: true
            }));

            set({ notifications, unreadCount: 0 });
        } catch (error) {
            set({ error: error.message });
            throw error;
        }
    },
}));

export default useNotificationsStore;