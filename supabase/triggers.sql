
-- GEMBIRA AI - Database Triggers
-- Run this in Supabase SQL Editor to enable automatic profile creation

-- 1. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, university, major, avatar_color)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'university',
    new.raw_user_meta_data->>'major',
    new.raw_user_meta_data->>'avatar_color'
  );
  
  -- Assign initial badge 'Newbie'
  INSERT INTO public.user_badges (user_id, badge_id)
  SELECT new.id, id FROM public.badges WHERE name = 'Newbie'
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Seed initial badges if they don't exist (Safety check)
INSERT INTO public.badges (name, description, icon, requirement_type, requirement_value)
VALUES 
  ('Newbie', 'Baru bergabung di Gembira AI', '🌱', 'system', 0),
  ('Explorer', 'Menyelesaikan 1 topik', '🧭', 'literacy_count', 1),
  ('Scholar', 'Mencapai Level 5', '🎓', 'level', 5)
ON CONFLICT (name) DO NOTHING;
