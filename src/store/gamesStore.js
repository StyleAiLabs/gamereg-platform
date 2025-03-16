import { create } from 'zustand';
import gamesService from '../services/gamesService';

const useGamesStore = create((set, get) => ({
    games: [],
    filteredGames: [],
    currentGame: null,
    loading: false,
    error: null,
    filter: {
        type: 'ALL',
        status: 'ACTIVE',
        searchTerm: '',
    },

    // Fetch all games
    fetchGames: async () => {
        set({ loading: true, error: null });
        try {
            const games = await gamesService.getGames();
            set({ games, filteredGames: games, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch a specific game by ID
    fetchGameById: async (gameId) => {
        set({ loading: true, error: null });
        try {
            const game = await gamesService.getGameById(gameId);
            set({ currentGame: game, loading: false });
            return game;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Join a game
    joinGame: async (gameId, userData) => {
        set({ loading: true, error: null });
        try {
            const result = await gamesService.joinGame(gameId, userData);
            // Update the games list after joining
            get().fetchGames();
            set({ loading: false });
            return result;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Update filter settings
    setFilter: (filterUpdate) => {
        const newFilter = { ...get().filter, ...filterUpdate };
        set({ filter: newFilter });

        // Apply filters
        const { games } = get();
        let filtered = [...games];

        // Filter by type
        if (newFilter.type !== 'ALL') {
            filtered = filtered.filter(game => game.type === newFilter.type);
        }

        // Filter by status
        if (newFilter.status !== 'ALL') {
            filtered = filtered.filter(game => game.status === newFilter.status);
        }

        // Filter by search term
        if (newFilter.searchTerm) {
            const term = newFilter.searchTerm.toLowerCase();
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(term)
            );
        }

        set({ filteredGames: filtered });
    },

    // Clear filters
    clearFilters: () => {
        set({
            filter: { type: 'ALL', status: 'ACTIVE', searchTerm: '' },
            filteredGames: get().games
        });
    },
}));

export default useGamesStore;