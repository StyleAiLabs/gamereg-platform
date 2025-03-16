import apiClient from '../utils/apiClient';

const groupsService = {
    getGameGroups: async (gameId) => {
        try {
            const response = await apiClient.get(`/games/${gameId}/groups`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch groups');
        }
    },

    getGroupById: async (groupId) => {
        try {
            const response = await apiClient.get(`/groups/${groupId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch group details');
        }
    },

    getMyGroups: async () => {
        try {
            const response = await apiClient.get('/groups/my-groups');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch your groups');
        }
    },

    joinGroup: async (groupId) => {
        try {
            const response = await apiClient.post(`/groups/${groupId}/join`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to join group');
        }
    },

    leaveGroup: async (groupId) => {
        try {
            const response = await apiClient.post(`/groups/${groupId}/leave`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to leave group');
        }
    },
};

export default groupsService;