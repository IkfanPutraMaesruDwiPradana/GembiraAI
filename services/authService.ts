import { supabase } from './supabaseClient';
import type { UserProfile } from '../types';

export interface AuthResponse {
    success: boolean;
    user?: UserProfile;
    error?: string;
    token?: string;
}

/**
 * Register a new user using Supabase Auth
 */
export const registerUser = async (
    username: string,
    password: string,
    name: string,
    university: string,
    major: string
): Promise<AuthResponse> => {
    try {
        // Supabase requires email, so we construct a fake email from username
        const email = `${username}@gembira.ai`;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    university,
                    major,
                    role: 'student',
                    avatar_color: '#3B82F6'
                }
            }
        });

        if (error) throw error;

        if (data.user) {
            // Fetch the created profile to return full user data
            // The trigger handle_new_user should have created the profile in public.users

            // Give a small delay for trigger to finish
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError) {
                // Determine fallback if profile fetch fails (e.g. trigger lag)
                // Construct temporary profile from input
                const tempUser: UserProfile = {
                    id: data.user.id,
                    username: username,
                    email: email,
                    name: name,
                    university: university,
                    major: major,
                    avatarColor: '#3B82F6',
                    xp: 0,
                    level: 1,
                    literacyProgress: 0,
                    badges: ['Newbie']
                };
                return { success: true, user: tempUser, token: data.session?.access_token };
            }

            // Map DB profile to UserProfile type
            const mappedUser: UserProfile = {
                id: profile.id,
                username: profile.email.split('@')[0],
                name: profile.name,
                email: profile.email,
                university: profile.university,
                major: profile.major,
                avatarColor: profile.avatar_color,
                xp: profile.xp,
                level: profile.level,
                literacyProgress: profile.literacy_progress,
                badges: [] // Fetch badges separately if needed, or rely on another call
            };

            return { success: true, user: mappedUser, token: data.session?.access_token };
        }

        return { success: false, error: 'Registration successful but no user data returned' };
    } catch (error: any) {
        return { success: false, error: error.message || 'Registration failed' };
    }
};

/**
 * Login user using Supabase Auth
 */
export const loginUser = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const email = `${username}@gembira.ai`;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        if (data.user) {
            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError) throw profileError;

            const mappedUser: UserProfile = {
                id: profile.id,
                username: profile.email.split('@')[0],
                name: profile.name,
                email: profile.email,
                university: profile.university,
                major: profile.major,
                avatarColor: profile.avatar_color,
                xp: profile.xp,
                level: profile.level,
                literacyProgress: profile.literacy_progress,
                badges: []
            };

            return { success: true, user: mappedUser, token: data.session?.access_token };
        }

        return { success: false, error: 'Login failed' };
    } catch (error: any) {
        return { success: false, error: error.message || 'Login failed' };
    }
};

/**
 * Logout current user
 */
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session?.user) {
            return { success: false, error: 'No active session' };
        }

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (profileError) throw profileError;

        const mappedUser: UserProfile = {
            id: profile.id,
            username: profile.email.split('@')[0],
            name: profile.name,
            email: profile.email,
            university: profile.university,
            major: profile.major,
            avatarColor: profile.avatar_color,
            xp: profile.xp,
            level: profile.level,
            literacyProgress: profile.literacy_progress,
            badges: []
        };

        return { success: true, user: mappedUser, token: session.access_token };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
