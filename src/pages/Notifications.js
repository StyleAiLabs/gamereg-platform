import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { format } from 'date-fns';
import { useNotifications } from '../hooks/useNotifications';

const Notifications = () => {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        loading,
        error
    } = useNotifications();

    const handleMarkAsRead = (notificationId) => {
        markAsRead(notificationId);
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead();
    };

    const getNotificationType = (type) => {
        switch (type) {
            case 'SYSTEM':
                return 'System';
            case 'GAME':
                return 'Game';
            case 'GROUP':
                return 'Group';
            default:
                return 'Notification';
        }
    };

    if (loading && notifications.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsIcon fontSize="large" /> Notifications
                    {unreadCount > 0 && (
                        <Typography
                            component="span"
                            sx={{
                                ml: 2,
                                bgcolor: 'error.main',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: '50%',
                                fontSize: '0.9rem'
                            }}
                        >
                            {unreadCount}
                        </Typography>
                    )}
                </Typography>

                {unreadCount > 0 && (
                    <Button
                        variant="outlined"
                        onClick={handleMarkAllAsRead}
                        startIcon={<NotificationsActiveIcon />}
                    >
                        Mark All as Read
                    </Button>
                )}
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {notifications.length === 0 ? (
                <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1">
                        You don't have any notifications yet.
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={2}>
                    <List sx={{ width: '100%' }}>
                        {notifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    secondaryAction={
                                        !notification.is_read ? (
                                            <Button
                                                size="small"
                                                onClick={() => handleMarkAsRead(notification.id)}
                                            >
                                                Mark as Read
                                            </Button>
                                        ) : null
                                    }
                                    sx={{
                                        bgcolor: notification.is_read ? 'transparent' : 'rgba(33, 150, 243, 0.08)',
                                        px: 3,
                                        py: 2
                                    }}
                                >
                                    <ListItemIcon sx={{ mt: 0 }}>
                                        {!notification.is_read ? (
                                            <FiberManualRecordIcon color="primary" sx={{ fontSize: 14 }} />
                                        ) : (
                                            <FiberManualRecordIcon color="disabled" sx={{ fontSize: 14 }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: notification.is_read ? 'normal' : 'bold'
                                                }}
                                            >
                                                {notification.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'block', mt: 1, mb: 1 }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {notification.message}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {getNotificationType(notification.type)}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                                                    </Typography>
                                                </Box>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Container>
    );
};

export default Notifications;