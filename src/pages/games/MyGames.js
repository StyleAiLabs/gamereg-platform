import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';
import LinearProgress from '@mui/material/LinearProgress';
import { format } from 'date-fns';

import useGroupsStore from '../../store/groupsStore';
import useGamesStore from '../../store/gamesStore';

const GroupDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const [isUserInGroup, setIsUserInGroup] = useState(false);

    const {
        currentGroup,
        loading: groupLoading,
        error: groupError,
        fetchGroupById,
        joinGroup,
        leaveGroup
    } = useGroupsStore();

    const {
        currentGame,
        fetchGameById
    } = useGamesStore();

    useEffect(() => {
        if (id) {
            fetchGroupById(id);
        }
    }, [id, fetchGroupById]);

    useEffect(() => {
        if (currentGroup && currentGroup.game_id) {
            fetchGameById(currentGroup.game_id);
        }
    }, [currentGroup, fetchGameById]);

    // Simulating check if user is in the group
    useEffect(() => {
        if (currentGroup && currentGroup.participants) {
            // Check if user's ID is in participants
            // For demo, we'll randomly set this
            setIsUserInGroup(Math.random() > 0.5);
        }
    }, [currentGroup]);

    const handleJoinGroup = async () => {
        try {
            await joinGroup(id);
            // Refresh group data
            fetchGroupById(id);
            setJoinDialogOpen(false);
            setIsUserInGroup(true);
        } catch (error) {
            console.error('Failed to join group:', error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            await leaveGroup(id);
            // Refresh group data
            fetchGroupById(id);
            setLeaveDialogOpen(false);
            setIsUserInGroup(false);
        } catch (error) {
            console.error('Failed to leave group:', error);
        }
    };

    const handleGoBack = () => {
        if (currentGroup && currentGroup.game_id) {
            navigate(`/games/${currentGroup.game_id}`);
        } else {
            navigate('/games');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN':
                return 'success';
            case 'FULL':
                return 'warning';
            case 'CLOSED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getParticipantCountText = () => {
        if (!currentGroup) return '';
        const current = currentGroup.participant_count || 0;
        const max = currentGroup.max_participants || 0;
        return `${current}/${max} participants`;
    };

    const getProgressValue = () => {
        if (!currentGroup || !currentGroup.max_participants) return 0;
        const current = currentGroup.participant_count || 0;
        return (current / currentGroup.max_participants) * 100;
    };

    if (groupLoading && !currentGroup) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (groupError) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 3 }}>
                    {groupError}
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    Back
                </Button>
            </Container>
        );
    }

    if (!currentGroup) {
        return (
            <Container maxWidth="lg">
                <Alert severity="info" sx={{ mt: 3 }}>
                    Group not found.
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    Back
                </Button>
            </Container>
        );
    }

    // Mock participants data - would come from API in real app
    const participants = [
        { id: 1, first_name: 'John', last_name: 'Doe', joined_at: new Date().toISOString() },
        { id: 2, first_name: 'Jane', last_name: 'Smith', joined_at: new Date().toISOString() },
        { id: 3, first_name: 'Robert', last_name: 'Johnson', joined_at: new Date().toISOString() },
    ];

    return (
        <Container maxWidth="lg">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{ mb: 3 }}
            >
                Back
            </Button>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupsIcon fontSize="large" /> {currentGroup.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={currentGroup.status}
                                color={getStatusColor(currentGroup.status)}
                            />
                            {currentGame && (
                                <Chip
                                    label={`Game: ${currentGame.name}`}
                                    variant="outlined"
                                    onClick={() => navigate(`/games/${currentGame.id}`)}
                                    clickable
                                />
                            )}
                        </Box>
                    </Box>

                    {currentGroup.status === 'OPEN' && !isUserInGroup && (
                        <Button
                            variant="contained"
                            onClick={() => setJoinDialogOpen(true)}
                        >
                            Join Group
                        </Button>
                    )}

                    {isUserInGroup && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setLeaveDialogOpen(true)}
                        >
                            Leave Group
                        </Button>
                    )}
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Group Details
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {getParticipantCountText()}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={getProgressValue()}
                                sx={{ height: 8, borderRadius: 5 }}
                            />
                        </Box>
                        <Typography variant="body1" paragraph>
                            <strong>Status:</strong> {currentGroup.status}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Created:</strong> {format(new Date(currentGroup.created_at), 'PPP')}
                        </Typography>
                        {currentGroup.updated_at && (
                            <Typography variant="body1" paragraph>
                                <strong>Last Updated:</strong> {format(new Date(currentGroup.updated_at), 'PPP')}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon /> Participants
                        </Typography>
                        <List>
                            {participants.map((participant) => (
                                <ListItem key={participant.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {participant.first_name.charAt(0)}
                                            {participant.last_name.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${participant.first_name} ${participant.last_name}`}
                                        secondary={`Joined: ${format(new Date(participant.joined_at), 'PP')}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Paper>

            {/* Join Group Dialog */}
            <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
                <DialogTitle>Join Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to join "{currentGroup.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleJoinGroup} variant="contained">Join</Button>
                </DialogActions>
            </Dialog>

            {/* Leave Group Dialog */}
            <Dialog open={leaveDialogOpen} onClose={() => setLeaveDialogOpen(false)}>
                <DialogTitle>Leave Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave "{currentGroup.name}"? Your progress in this group will be saved.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLeaveDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleLeaveGroup} variant="contained" color="error">Leave</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GroupDetails;