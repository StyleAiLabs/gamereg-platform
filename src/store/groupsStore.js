import { create } from 'zustand';
import groupsService from '../services/groupsService';

const useGroupsStore = create((set, get) => ({
    groups: [],
    myGroups: [],
    currentGroup: null,
    loading: false,
    error: null,

    // Fetch groups for a specific game
    fetchGameGroups: async (gameId) => {
        set({ loading: true, error: null });
        try {
            // Mock data for development
            setTimeout(() => {
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
                set({ groups: mockGroups, loading: false });
            }, 500);

        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch a specific group by ID
    fetchGroupById: async (groupId) => {
        set({ loading: true, error: null });
        try {
            // Mock data for development
            setTimeout(() => {
                const mockGroup = {
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
                set({ currentGroup: mockGroup, loading: false });
            }, 500);

        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch groups the user is part of
    fetchMyGroups: async () => {
        set({ loading: true, error: null });
        try {
            // Mock data for development
            setTimeout(() => {
                const mockMyGroups = [
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
                set({ myGroups: mockMyGroups, loading: false });
            }, 500);

        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Join a group
    joinGroup: async (groupId) => {
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

    // Leave a group
    leaveGroup: async (groupId) => {
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
}));

export default useGroupsStore;