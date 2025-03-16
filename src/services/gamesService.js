import apiClient from '../utils/apiClient';

const gamesService = {
    getGames: async () => {
        try {
            const response = await apiClient.get('/games');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch games');
        }
    },

    getGameById: async (gameId) => {
        try {
            const response = await apiClient.get(`/games/${gameId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch game details');
        }
    },

    joinGame: async (gameId, userData = {}) => {
        try {
            const response = await apiClient.post(`/games/${gameId}/join`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to join game');
        }
    },

    getMyGames: async () => {
        try {
            const response = await apiClient.get('/games/my-games');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch your games');
        }
    },
};

export default gamesService;