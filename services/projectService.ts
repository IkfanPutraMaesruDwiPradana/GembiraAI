import { supabase } from './supabaseClient';
import type { Project } from '../types';

const mapProject = (row: any): Project => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    content: row.content,
    status: row.status as any,
    aiFeedback: row.ai_feedback,
    submittedAt: row.submitted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export const createProject = async (userId: string, title: string, description?: string, content?: string): Promise<{ success: boolean; project?: Project; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert({
                user_id: userId,
                title,
                description,
                content
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, project: mapProject(data) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data ? data.map(mapProject) : [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const updateProject = async (projectId: string, updates: any): Promise<{ success: boolean; project?: Project; error?: string }> => {
    try {
        // Map updates to snake_case
        const dbUpdates: any = {};
        if (updates.title !== undefined) dbUpdates.title = updates.title;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.content !== undefined) dbUpdates.content = updates.content;
        if (updates.status !== undefined) dbUpdates.status = updates.status;
        if (updates.aiFeedback !== undefined) dbUpdates.ai_feedback = updates.aiFeedback;
        if (updates.submittedAt !== undefined) dbUpdates.submitted_at = updates.submittedAt;

        const { data, error } = await supabase
            .from('projects')
            .update(dbUpdates)
            .eq('id', projectId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, project: mapProject(data) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteProject = async (projectId: string): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
