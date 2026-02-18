import { api } from './api';
import type { UserProfile } from '../types';

export interface AuthResponse {
    success: boolean;
    user?: UserProfile;
    error?: string;
    token?: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
    username: string,
    password: string,
    name: string,
    university: string,
    major: string
): Promise<AuthResponse> => {
    try {
        const result = await api.post<AuthResponse>('/auth/register', {
            username,
            password,
            name,
            university,
            major,
            avatar_color: '#3B82F6' // Default logic handled in backend usually
        });

        if (result.success && result.token) {
            localStorage.setItem('auth_token', result.token);
            // Ensure result.user is typed correctly or mapped
            return { success: true, user: result.user as UserProfile };
        }

        return { success: false, error: result.error };
    } catch (error: any) {
        return { success: false, error: error.message || 'Registration failed' };
    }
};

/**
 * Login user
 */
export const loginUser = async (
    username: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const result = await api.post<AuthResponse>('/auth/login', {
            username,
            password
        });

        if (result.success && result.token) {
            localStorage.setItem('auth_token', result.token);
            return { success: true, user: result.user as UserProfile };
        }

        return { success: false, error: result.error || 'Login failed' };
    } catch (error: any) {
        return { success: false, error: error.message || 'Login failed' };
    }
};

/**
 * Logout current user
 */
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
    localStorage.removeItem('auth_token');
    return { success: true };
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
    // For now, we rely on client state or re-fetch profile if needed
    // Simple implementation: check token existence, if exists, return stored user (logic needs improvement for real app)
    // A better way is to call an endpoint /auth/me
    const token = localStorage.getItem('auth_token');
    if (!token) return { success: false, error: 'No token' };

    // Ideally call API
    // const result = await api.get<UserProfile>('/auth/me');
    // return { success: true, user: result.data };

    return { success: false, error: 'Not implemented check' };
};
