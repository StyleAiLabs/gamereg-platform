import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

import useGroupsStore from '../../store/groupsStore';
import useGamesStore from '../../store/gamesStore';
import GroupList from '../../components/groups/GroupList';

const Groups = () => {
    const { id: gameId } = useParams();
    const navigate = useNavigate();

    const {
        groups,
        loading: groupsLoading,
        error: groupsError,
        fetchGameGroups
    } = useGroupsStore();

    const {
        currentGame,
        loading: gameLoading,
        error: gameError,
        fetchGameById
    } = useGamesStore();

    useEffect(() => {
        if (gameId) {
            fetchGameById(gameId);
            fetchGameGroups(gameId);
        }
    }, [gameId, fetchGameById, fetchGameGroups]);

    const handleGoBack = () => {
        navigate(`/games/${gameId}`);
    };

    const handleRefresh = () => {
        fetchGameGroups(gameId);
    };

    if ((gameLoading && !currentGame) || (groupsLoading && !groups.length)) {
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
                    onClick={() => navigate('/games')}
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
                Back to Game
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {currentGame ? `Groups for ${currentGame.name}` : 'Available Groups'}
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    disabled={groupsLoading}
                >
                    Refresh
                </Button>
            </Box>

            {groupsError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {groupsError}
                </Alert>
            )}

            <GroupList
                groups={groups}
                loading={groupsLoading}
                error={groupsError}
            />
        </Container>
    );
};

export default Groups;