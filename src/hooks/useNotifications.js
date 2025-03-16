import { useEffect } from 'react';
import useNotificationsStore from '../store/notificationsStore';

export const useNotifications = () => {
    const {
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        loading,
        error
    } = useNotificationsStore();

    useEffect(() => {
        // For demo purposes, we'll mock the notifications data
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

        // Mock the fetching of notifications
        setTimeout(() => {
            fetchNotifications();
        }, 500);

        // Setup polling for new notifications every minute in a real app
        const interval = setInterval(() => {
            fetchNotifications();
        }, 60000);

        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        loading,
        error,
    };
};

export default useNotifications;