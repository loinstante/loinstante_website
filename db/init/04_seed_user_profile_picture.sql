-- Ensure existing seeded/test users have a PNG profile picture URL
-- Useful when the DB was already initialized before profile_picture seeding.

UPDATE public.users
SET profile_picture = 'https://api.dicebear.com/9.x/pixel-art/png?seed=tester'
WHERE email = 'tester@example.com'
  AND (profile_picture IS NULL OR profile_picture = '');
