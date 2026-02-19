import { supabase } from './supabaseClient';
import type { ReflectionEntry } from '../types';

// Helper to map DB row to ReflectionEntry
const mapReflection = (row: any): ReflectionEntry => ({
    id: row.id,
    date: row.date,
    answers: row.answers,
    aiAnalysis: row.ai_analysis
});

export const saveReflection = async (userId: string, answers: Record<string, string>, aiAnalysis?: string): Promise<{ success: boolean; reflection?: ReflectionEntry; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('reflection_entries')
            .insert({
                user_id: userId,
                answers,
                ai_analysis: aiAnalysis,
                date: new Date().toISOString().split('T')[0] // today YYYY-MM-DD
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, reflection: mapReflection(data) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getUserReflections = async (userId: string): Promise<ReflectionEntry[]> => {
    try {
        const { data, error } = await supabase
            .from('reflection_entries')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data ? data.map(mapReflection) : [];
    } catch (error) {
        console.error('Error fetching reflections:', error);
        return [];
    }
};

export const updateReflectionAnalysis = async (reflectionId: string, aiAnalysis: string): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase
            .from('reflection_entries')
            .update({ ai_analysis: aiAnalysis })
            .eq('id', reflectionId);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteReflection = async (reflectionId: string): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase
            .from('reflection_entries')
            .delete()
            .eq('id', reflectionId);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
