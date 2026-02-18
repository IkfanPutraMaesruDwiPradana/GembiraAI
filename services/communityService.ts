import { supabase } from './supabaseClient';

export interface CommunityPost {
    id: string;
    userId: string;
    userName: string;
    userAvatarColor: string;
    title: string;
    content: string;
    category: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    isLikedByUser?: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    userName: string;
    userAvatarColor: string;
    content: string;
    createdAt: string;
}

/**
 * Create a new community post
 */
export const createPost = async (
    userId: string,
    title: string,
    content: string,
    category: string = 'general'
): Promise<{ success: boolean; post?: CommunityPost; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('community_posts')
            .insert({
                user_id: userId,
                title,
                content,
                category,
            })
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        // Get user info
        const { data: userData } = await supabase
            .from('users')
            .select('name, avatar_color')
            .eq('id', userId)
            .single();

        const post: CommunityPost = {
            id: data.id,
            userId: data.user_id,
            userName: userData?.name || 'Anonymous',
            userAvatarColor: userData?.avatar_color || '#3B82F6',
            title: data.title,
            content: data.content,
            category: data.category,
            likesCount: data.likes_count,
            commentsCount: data.comments_count,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        return { success: true, post };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to create post' };
    }
};

/**
 * Get community posts with pagination
 */
export const getPosts = async (
    currentUserId?: string,
    category?: string,
    limit: number = 20,
    offset: number = 0
): Promise<CommunityPost[]> => {
    try {
        let query = supabase
            .from('community_posts')
            .select('*, users(name, avatar_color)')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        // Check if current user liked each post
        const posts: CommunityPost[] = await Promise.all(
            data.map(async (post: any) => {
                let isLikedByUser = false;

                if (currentUserId) {
                    const { data: likeData } = await supabase
                        .from('post_likes')
                        .select('id')
                        .eq('post_id', post.id)
                        .eq('user_id', currentUserId)
                        .single();

                    isLikedByUser = !!likeData;
                }

                return {
                    id: post.id,
                    userId: post.user_id,
                    userName: post.users?.name || 'Anonymous',
                    userAvatarColor: post.users?.avatar_color || '#3B82F6',
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    likesCount: post.likes_count,
                    commentsCount: post.comments_count,
                    createdAt: post.created_at,
                    updatedAt: post.updated_at,
                    isLikedByUser,
                };
            })
        );

        return posts;
    } catch (error) {
        console.error('Error in getPosts:', error);
        return [];
    }
};

/**
 * Like a post
 */
export const likePost = async (
    userId: string,
    postId: string
): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase
            .from('post_likes')
            .insert({
                user_id: userId,
                post_id: postId,
            });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to like post' };
    }
};

/**
 * Unlike a post
 */
export const unlikePost = async (
    userId: string,
    postId: string
): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase
            .from('post_likes')
            .delete()
            .eq('user_id', userId)
            .eq('post_id', postId);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to unlike post' };
    }
};

/**
 * Add a comment to a post
 */
export const addComment = async (
    userId: string,
    postId: string,
    content: string
): Promise<{ success: boolean; comment?: Comment; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('community_comments')
            .insert({
                user_id: userId,
                post_id: postId,
                content,
            })
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        // Get user info
        const { data: userData } = await supabase
            .from('users')
            .select('name, avatar_color')
            .eq('id', userId)
            .single();

        const comment: Comment = {
            id: data.id,
            postId: data.post_id,
            userId: data.user_id,
            userName: userData?.name || 'Anonymous',
            userAvatarColor: userData?.avatar_color || '#3B82F6',
            content: data.content,
            createdAt: data.created_at,
        };

        return { success: true, comment };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to add comment' };
    }
};

/**
 * Get comments for a post
 */
export const getPostComments = async (postId: string): Promise<Comment[]> => {
    try {
        const { data, error } = await supabase
            .from('community_comments')
            .select('*, users(name, avatar_color)')
            .eq('post_id', postId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching comments:', error);
            return [];
        }

        return data.map((comment: any) => ({
            id: comment.id,
            postId: comment.post_id,
            userId: comment.user_id,
            userName: comment.users?.name || 'Anonymous',
            userAvatarColor: comment.users?.avatar_color || '#3B82F6',
            content: comment.content,
            createdAt: comment.created_at,
        }));
    } catch (error) {
        console.error('Error in getPostComments:', error);
        return [];
    }
};

/**
 * Get user's post count (for badge tracking)
 */
export const getUserPostCount = async (userId: string): Promise<number> => {
    try {
        const { count, error } = await supabase
            .from('community_posts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (error) {
            console.error('Error counting posts:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Error in getUserPostCount:', error);
        return 0;
    }
};
