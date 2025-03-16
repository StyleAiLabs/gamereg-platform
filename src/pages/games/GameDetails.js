import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';

import useGamesStore from '../../store/gamesStore';
import useGroupsStore from '../../store/groupsStore';
import GroupList from '../../components/groups/GroupList';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    const {
        currentGame,
        loading: gameLoading,
        error: gameError,
        fetchGameById,
        joinGame
    } = useGamesStore();

    const {
        groups,
        loading: groupsLoading,
        error: groupsError,
        fetchGameGroups
    } = useGroupsStore();

    useEffect(() => {
        if (id) {
            fetchGameById(id);
            if (currentGame?.type === 'GROUP') {
                fetchGameGroups(id);
            }
        }
    }, [id, fetchGameById, fetchGameGroups, currentGame?.type]);

    const handleJoinGame = async () => {
        try {
            await joinGame(id);
            // Refresh game data
            fetchGameById(id);
            setJoinDialogOpen(false);
        } catch (error) {
            console.error('Failed to join game:', error);
        }
    };

    const handleGoBack = () => {
        navigate('/games');
    };

    if (gameLoading && !currentGame) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (gameError) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 3 }}>
                    {gameError}
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    Back to Games
                </Button>
            </Container>
        );
    }

    if (!currentGame) {
        return (
            <Container maxWidth="lg">
                <Alert severity="info" sx={{ mt: 3 }}>
                    Game not found.
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    Back to Games
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{ mb: 3 }}
            >
                Back to Games
            </Button>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {currentGame.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                icon={currentGame.type === 'GROUP' ? <PeopleIcon /> : <PersonIcon />}
                                label={currentGame.type === 'GROUP' ? 'Group Game' : 'Individual Game'}
                                color="primary"
                            />
                            <Chip
                                label={currentGame.status}
                                color={currentGame.status === 'ACTIVE' ? 'success' : 'default'}
                            />
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => setJoinDialogOpen(true)}
                        disabled={currentGame.status !== 'ACTIVE'}
                    >
                        Join Game
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Game Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body1">
                                <strong>Type:</strong> {currentGame.type}
                            </Typography>
                            {currentGame.type === 'GROUP' ? (
                                <>
                                    <Typography variant="body1">
                                        <strong>Max Groups:</strong> {currentGame.max_groups}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Participants per Group:</strong> {currentGame.participants_per_group}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body1">
                                    <strong>Max Participants:</strong> {currentGame.max_participants}
                                </Typography>
                            )}
                            <Typography variant="body1">
                                <strong>Status:</strong> {currentGame.status}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Additional Information
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body1">
                                <strong>Created:</strong> {format(new Date(currentGame.created_at), 'PPP')}
                            </Typography>
                            {currentGame.updated_at && (
                                <Typography variant="body1">
                                    <strong>Last Updated:</strong> {format(new Date(currentGame.updated_at), 'PPP')}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {currentGame.type === 'GROUP' && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GroupsIcon /> Available Groups
                    </Typography>

                    <GroupList
                        groups={groups}
                        loading={groupsLoading}
                        error={groupsError}
                    />
                </Box>
            )}

            {/* Join Game Dialog */}
            <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)}>
                <DialogTitle>Join Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to join "{currentGame.name}"?
                        {currentGame.type === 'GROUP'
                            ? " You'll need to join a group after confirming."
                            : ""}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleJoinGame} variant="contained">Join</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GameDetails;