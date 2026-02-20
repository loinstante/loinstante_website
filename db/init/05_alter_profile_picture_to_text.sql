-- Ensure profile_picture can store uploaded image data URLs (base64)
ALTER TABLE public.users
  ALTER COLUMN profile_picture TYPE TEXT;
