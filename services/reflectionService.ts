import { api } from './api';
import type { ReflectionEntry } from '../types';

export const saveReflection = async (userId: string, answers: Record<string, string>, aiAnalysis?: string): Promise<{ success: boolean; reflection?: ReflectionEntry; error?: string }> => {
    return await api.post('/reflections', { userId, answers, aiAnalysis });
};

export const getUserReflections = async (userId: string): Promise<ReflectionEntry[]> => {
    const result = await api.get<ReflectionEntry[]>(`/reflections/user/${userId}`);
    return result.success && result.data ? result.data : [];
};

export const updateReflectionAnalysis = async (reflectionId: string, aiAnalysis: string): Promise<{ success: boolean; error?: string }> => {
    return await api.put(`/reflections/${reflectionId}/analysis`, { aiAnalysis });
};

export const deleteReflection = async (reflectionId: string): Promise<{ success: boolean; error?: string }> => {
    return await api.delete(`/reflections/${reflectionId}`);
};
