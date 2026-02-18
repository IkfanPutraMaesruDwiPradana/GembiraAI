import { api } from './api';
import type { LiteracyTopic } from '../types';

export const getLiteracyTopics = async (): Promise<LiteracyTopic[]> => {
    const result = await api.get<LiteracyTopic[]>('/literacy/topics');
    return result.success && result.data ? result.data : [];
};

export const getUserLiteracyProgress = async (userId: string): Promise<any[]> => {
    const result = await api.get<any[]>(`/literacy/progress/${userId}`);
    return result.success && result.data ? result.data : [];
};

export const completeTopic = async (userId: string, topicId: string, notes?: string): Promise<{ success: boolean; xpEarned?: number; error?: string }> => {
    return await api.post('/literacy/complete', { userId, topicId, notes });
};

export const isTopicCompleted = async (userId: string, topicId: string): Promise<boolean> => {
    const result = await api.get<{ completed: boolean }>(`/literacy/check/${userId}/${topicId}`);
    return result.success && result.data ? result.data.completed : false;
};
