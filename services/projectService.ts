import { api } from './api';
import type { Project } from '../types';

export const createProject = async (userId: string, title: string, description?: string, content?: string): Promise<{ success: boolean; project?: Project; error?: string }> => {
    return await api.post('/projects', { userId, title, description, content });
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
    const result = await api.get<Project[]>(`/projects/user/${userId}`);
    return result.success && result.data ? result.data : [];
};

export const updateProject = async (projectId: string, updates: any): Promise<{ success: boolean; project?: Project; error?: string }> => {
    return await api.put(`/projects/${projectId}`, updates);
};

export const deleteProject = async (projectId: string): Promise<{ success: boolean; error?: string }> => {
    return await api.delete(`/projects/${projectId}`);
};
