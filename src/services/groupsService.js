import apiClient from '../utils/apiClient';

const groupsService = {
    getGameGroups: async (gameId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get(`/games/${gameId}/groups`);
            // return response.data;

            // For development, return mock groups
            const mockGroups = [
                {
                    id: 101,
                    game_id: parseInt(gameId),
                    name: "Team Alpha",
                    max_participants: 5,
                    participant_count: 3,
                    created_at: "2023-06-02T00:00:00Z",
                    updated_at: null,
                    status: "OPEN"
                },
                {
                    id: 102,
                    game_id: parseInt(gameId),
                    name: "Team Beta",
                    max_participants: 5,
                    participant_count: 5,
                    created_at: "2023-06-03T00:00:00Z",
                    updated_at: null,
                    status: "FULL"
                },
                {
                    id: 103,
                    game_id: parseInt(gameId),
                    name: "Team Gamma",
                    max_participants: 5,
                    participant_count: 2,
                    created_at: "2023-06-04T00:00:00Z",
                    updated_at: null,
                    status: "OPEN"
                }
            ];

            return mockGroups;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch groups');
        }
    },

    getGroupById: async (groupId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get(`/groups/${groupId}`);
            // return response.data;

            // For development, return mock group
            return {
                id: parseInt(groupId),
                game_id: 1,
                name: "Team Alpha",
                max_participants: 5,
                participant_count: 3,
                created_at: "2023-06-02T00:00:00Z",
                updated_at: null,
                status: "OPEN",
                participants: [
                    { id: 1, first_name: "John", last_name: "Doe", joined_at: "2023-06-03T00:00:00Z" },
                    { id: 2, first_name: "Jane", last_name: "Smith", joined_at: "2023-06-04T00:00:00Z" },
                    { id: 3, first_name: "Robert", last_name: "Johnson", joined_at: "2023-06-05T00:00:00Z" }
                ]
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch group details');
        }
    },

    getMyGroups: async () => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.get('/groups/my-groups');
            // return response.data;

            // For development, return mock groups
            return [
                {
                    id: 101,
                    game_id: 1,
                    name: "Team Alpha",
                    max_participants: 5,
                    participant_count: 3,
                    created_at: "2023-06-02T00:00:00Z",
                    updated_at: null,
                    status: "OPEN"
                },
                {
                    id: 105,
                    game_id: 3,
                    name: "Innovation Squad",
                    max_participants: 6,
                    participant_count: 4,
                    created_at: "2023-06-10T00:00:00Z",
                    updated_at: null,
                    status: "OPEN"
                }
            ];
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch your groups');
        }
    },

    joinGroup: async (groupId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post(`/groups/${groupId}/join`);
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Successfully joined the group!' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to join group');
        }
    },

    leaveGroup: async (groupId) => {
        try {
            // In a real app, this would be an API call
            // const response = await apiClient.post(`/groups/${groupId}/leave`);
            // return response.data;

            // For development, just return success
            return { success: true, message: 'Successfully left the group!' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to leave group');
        }
    },
};

export default groupsService;