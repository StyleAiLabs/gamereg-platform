import apiClient from '../utils/apiClient';

const gamesService = {
    getGames: async () => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get('/games');
            // return response.data;

            // For development, return mock games
            const mockGames = [
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

            return mockGames;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch games');
        }
    },

    getGameById: async (gameId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get(`/games/${gameId}`);
            // return response.data;

            // For development, return mock game data
            return {
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
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch game details');
        }
    },

    joinGame: async (gameId, userData = {}) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post(`/games/${gameId}/join`, userData);
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Successfully joined the game!' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to join game');
        }
    },

    getMyGames: async () => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get('/games/my-games');
            // return response.data;

            // For development, return mock data
            return [
                {
                    id: 1,
                    name: "Strategy Challenge",
                    type: "GROUP",
                    status: "ACTIVE",
                    progress: 45,
                    joined_at: "2023-06-15T10:00:00Z",
                    last_activity: "2023-06-20T14:30:00Z",
                    group: {
                        id: 101,
                        name: "Team Alpha"
                    }
                },
                {
                    id: 2,
                    name: "Leadership Quiz",
                    type: "INDIVIDUAL",
                    status: "COMPLETED",
                    progress: 100,
                    joined_at: "2023-05-10T09:15:00Z",
                    last_activity: "2023-05-12T16:45:00Z"
                },
                {
                    id: 3,
                    name: "Product Knowledge Test",
                    type: "INDIVIDUAL",
                    status: "ACTIVE",
                    progress: 75,
                    joined_at: "2023-06-05T11:30:00Z",
                    last_activity: "2023-06-18T10:20:00Z"
                }
            ];
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch your games');
        }
    },
};

export default gamesService;