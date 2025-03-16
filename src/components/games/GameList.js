import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import GameCard from './GameCard';

const GameList = ({ games, loading, error }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!games || games.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">No games available.</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {games.map((game) => (
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                    <GameCard game={game} />
                </Grid>
            ))}
        </Grid>
    );
};

export default GameList;