-- ==========================================
-- KALENJIN MUSIC AWARDS - SUPABASE SCHEMA
-- ==========================================

-- 1. TABLES
-- ==========================================

-- Categories (Using UUIDs for Supabase best practice, but maintaining SERIAL compatibility if requested)
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    "group" text, -- e.g., 'VERNACULAR', 'GOSPEL'
    icon text,    -- e.g., 'Mic', 'Music'
    description text,
    created_at timestamptz DEFAULT now()
);

-- Artists
CREATE TABLE IF NOT EXISTS public.artists (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    real_name text,
    image_url text,
    bio text,
    song_title text,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    region text,
    gender text CHECK (gender IN ('Male', 'Female')),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Votes (The heart of the app)
CREATE TABLE IF NOT EXISTS public.votes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    artist_id uuid REFERENCES public.artists(id) ON DELETE CASCADE,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, category_id) -- Critical: One vote per category per user
);

-- Contacts (Inquiries from the Contact Us page)
CREATE TABLE IF NOT EXISTS public.contacts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    created_at timestamptz DEFAULT now(),
    is_read boolean DEFAULT false
);

-- Profiles (Public mirrors of Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    name text,
    phone text,
    role text DEFAULT 'voter' CHECK (role IN ('voter', 'admin')),
    created_at timestamptz DEFAULT now()
);

-- 2. SECURE FUNCTIONS (To avoid RLS recursion)
-- ==========================================

CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT role = 'admin' 
    FROM public.profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. AUTOMATION (Trigger for new users)
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, phone)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run handle_new_user when a user signs up
-- NOTE: You must run this in Supabase as a superuser if manually recreating
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Categories & Artists: Everyone can read, only Admins can write
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin Write Categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public Read Approved Artists" ON public.artists FOR SELECT USING (status = 'approved');
CREATE POLICY "Admin Read All Artists" ON public.artists FOR SELECT USING (public.is_admin());
CREATE POLICY "Public Apply" ON public.artists FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Write Artists" ON public.artists FOR ALL USING (public.is_admin());

-- Votes: Users can see their own, everyone can see totals for results, Admins see all
CREATE POLICY "Users can see own votes" ON public.votes FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own votes" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Note: Result grouping doesn't require SELECT access if using aggregate views, 
-- but we grant public SELECT to simplify debugging for this specific project.
CREATE POLICY "Public Select Votes for Results" ON public.votes FOR SELECT USING (true);

-- Profiles: Users see themselves, Admins see everyone
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT USING (public.is_admin());

-- Contacts: Public can insert, only Admins can read
CREATE POLICY "Public insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read contacts" ON public.contacts FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins update contacts" ON public.contacts FOR UPDATE USING (public.is_admin());

-- 5. INITIAL DATA (Optional)
-- ==========================================
-- (Include your category inserts here if you want a clean start)
