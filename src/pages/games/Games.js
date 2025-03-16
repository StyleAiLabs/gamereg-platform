import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import useGamesStore from '../../store/gamesStore';
import GameList from '../../components/games/GameList';
import GameFilter from '../../components/games/GameFilter';

const Games = () => {
    const {
        filteredGames,
        loading,
        error,
        filter,
        fetchGames,
        setFilter,
        clearFilters
    } = useGamesStore();

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Available Games
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={fetchGames}
                    disabled={loading}
                >
                    Refresh
                </Button>
            </Box>

            <GameFilter
                filter={filter}
                onFilterChange={setFilter}
                onClearFilters={clearFilters}
            />

            <GameList
                games={filteredGames}
                loading={loading}
                error={error}
            />
        </Container>
    );
};

export default Games;