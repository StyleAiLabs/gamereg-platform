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
            const groups = await groupsService.getGameGroups(gameId);
            set({ groups, loading: false });
            return groups;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch a specific group by ID
    fetchGroupById: async (groupId) => {
        set({ loading: true, error: null });
        try {
            const group = await groupsService.getGroupById(groupId);
            set({ currentGroup: group, loading: false });
            return group;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch groups the user is part of
    fetchMyGroups: async () => {
        set({ loading: true, error: null });
        try {
            const myGroups = await groupsService.getMyGroups();
            set({ myGroups, loading: false });
            return myGroups;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Join a group
    joinGroup: async (groupId) => {
        set({ loading: true, error: null });
        try {
            const result = await groupsService.joinGroup(groupId);
            // Refresh groups after joining
            if (get().currentGroup && get().currentGroup.id === groupId) {
                get().fetchGroupById(groupId);
            }
            get().fetchMyGroups();
            set({ loading: false });
            return result;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Leave a group
    leaveGroup: async (groupId) => {
        set({ loading: true, error: null });
        try {
            const result = await groupsService.leaveGroup(groupId);
            // Refresh groups after leaving
            get().fetchMyGroups();
            set({ loading: false });
            return result;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
}));

export default useGroupsStore;