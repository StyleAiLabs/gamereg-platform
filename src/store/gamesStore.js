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
            // Mock data for development
            setTimeout(() => {
                const games = [
                    {
                        id: 1,
                        name: "Leadership Challenge",
                        type: "GROUP",
                        status: "ACTIVE",
                        max_groups: 10,
                        participants_per_group: 5,
                        max_participants: null,
                        created_at: "2023-06-01T00:00:00Z",
                        updated_at: "2023-06-05T00:00:00Z"
                    },
                    {
                        id: 2,
                        name: "Product Knowledge Quiz",
                        type: "INDIVIDUAL",
                        status: "ACTIVE",
                        max_groups: null,
                        participants_per_group: null,
                        max_participants: 100,
                        created_at: "2023-05-15T00:00:00Z",
                        updated_at: "2023-05-20T00:00:00Z"
                    },
                    {
                        id: 3,
                        name: "Team Building Exercise",
                        type: "GROUP",
                        status: "UPCOMING",
                        max_groups: 8,
                        participants_per_group: 6,
                        max_participants: null,
                        created_at: "2023-06-10T00:00:00Z",
                        updated_at: null
                    },
                    {
                        id: 4,
                        name: "Sales Training Assessment",
                        type: "INDIVIDUAL",
                        status: "COMPLETED",
                        max_groups: null,
                        participants_per_group: null,
                        max_participants: 50,
                        created_at: "2023-04-01T00:00:00Z",
                        updated_at: "2023-05-01T00:00:00Z"
                    }
                ];
                set({ games, filteredGames: games, loading: false });
            }, 500);

        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch a specific game by ID
    fetchGameById: async (gameId) => {
        set({ loading: true, error: null });
        try {
            // Mock data for development
            setTimeout(() => {
                const gameData = {
                    id: parseInt(gameId),
                    name: gameId === "1" ? "Leadership Challenge" : "Product Knowledge Quiz",
                    type: gameId === "1" ? "GROUP" : "INDIVIDUAL",
                    status: "ACTIVE",
                    max_groups: gameId === "1" ? 10 : null,
                    participants_per_group: gameId === "1" ? 5 : null,
                    max_participants: gameId === "1" ? null : 100,
                    created_at: "2023-06-01T00:00:00Z",
                    updated_at: "2023-06-05T00:00:00Z"
                };
                set({ currentGame: gameData, loading: false });
            }, 500);

        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Join a game
    joinGame: async (gameId, userData) => {
        set({ loading: true, error: null });
        try {
            // Mock success for development
            setTimeout(() => {
                set({ loading: false });
            }, 500);

            return { success: true };
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