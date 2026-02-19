
-- GEMBIRA AI - Database Triggers (FIXED v2)
-- Run this in Supabase SQL Editor to enable automatic profile creation

-- 1. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, university, major, avatar_color)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    COALESCE(new.raw_user_meta_data->>'university', ''),
    COALESCE(new.raw_user_meta_data->>'major', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_color', '#3B82F6')
  );
  
  -- Assign initial badge 'Newbie'
  INSERT INTO public.user_badges (user_id, badge_id)
  SELECT new.id, id FROM public.badges WHERE name = 'Newbie'
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create trigger (safe: drops if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
