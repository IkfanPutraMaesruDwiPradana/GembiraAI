import { api } from './api';
import type { UserProfile } from '../types';

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const result = await api.get<UserProfile>(`/users/${userId}`);
    return result.success && result.data ? result.data : null;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: {
        name?: string;
        university?: string;
        major?: string;
        avatar_color?: string;
    }
): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    return await api.put(`/users/${userId}`, updates);
};

/**
 * Add XP to user
 */
export const addUserXP = async (
    userId: string,
    xpAmount: number
): Promise<{ success: boolean; newXP?: number; newLevel?: number; error?: string }> => {
    return await api.post(`/users/${userId}/xp`, { xpAmount });
};

/**
 * Get user badges
 */
export const getUserBadges = async (userId: string): Promise<string[]> => {
    const result = await api.get<string[]>(`/users/${userId}/badges`);
    return result.success && result.data ? result.data : [];
};

/**
 * Award a badge to user
 */
export const awardBadge = async (userId: string, badgeId: string): Promise<{ success: boolean; error?: string }> => {
    return await api.post(`/users/${userId}/badges`, { badgeId });
};

/**
 * Get all available badges
 */
export const getAllBadges = async () => {
    const result = await api.get<any[]>('/badges');
    return result.success && result.data ? result.data : [];
};
