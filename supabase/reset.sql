-- GEMBIRA AI - Reset Database Script
-- Run this FIRST if you have existing tables that need to be cleaned up

-- =====================================================
-- DROP ALL EXISTING TABLES (if they exist)
-- =====================================================

-- Drop triggers first
DROP TRIGGER IF EXISTS check_badges_on_xp_update ON users;
DROP TRIGGER IF EXISTS update_comments_count_trigger ON community_comments;
DROP TRIGGER IF EXISTS update_likes_count_trigger ON post_likes;
DROP TRIGGER IF EXISTS update_literacy_progress_trigger ON literacy_progress;
DROP TRIGGER IF EXISTS update_community_comments_updated_at ON community_comments;
DROP TRIGGER IF EXISTS update_community_posts_updated_at ON community_posts;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_literacy_progress_updated_at ON literacy_progress;
DROP TRIGGER IF EXISTS update_literacy_topics_updated_at ON literacy_topics;
DROP TRIGGER IF EXISTS update_reflection_entries_updated_at ON reflection_entries;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Drop functions
DROP FUNCTION IF EXISTS check_and_award_badges();
DROP FUNCTION IF EXISTS update_post_comments_count();
DROP FUNCTION IF EXISTS update_post_likes_count();
DROP FUNCTION IF EXISTS update_user_literacy_progress();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS community_comments CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS literacy_progress CASCADE;
DROP TABLE IF EXISTS literacy_topics CASCADE;
DROP TABLE IF EXISTS reflection_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop any Indonesian-named tables if they exist
DROP TABLE IF EXISTS pengguna CASCADE;
DROP TABLE IF EXISTS topik_literasi CASCADE;
DROP TABLE IF EXISTS progres_literasi CASCADE;
DROP TABLE IF EXISTS entri_refleksi CASCADE;
DROP TABLE IF EXISTS proyek CASCADE;
DROP TABLE IF EXISTS postingan_komunitas CASCADE;
DROP TABLE IF EXISTS komentar_komunitas CASCADE;
DROP TABLE IF EXISTS suka_postingan CASCADE;
DROP TABLE IF EXISTS lencana CASCADE;
DROP TABLE IF EXISTS lencana_pengguna CASCADE;

-- =====================================================
-- NOTES
-- =====================================================
-- After running this script:
-- 1. Run schema.sql to create fresh tables
-- 2. Run seed.sql to populate initial data
-- 3. Test registration again
