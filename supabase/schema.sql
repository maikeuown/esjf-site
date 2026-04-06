-- ============================================
-- ESJF Website - Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. ENUMS AND TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'secretary');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'scheduled', 'archived');
CREATE TYPE document_category AS ENUM (
  'regulamentos',
  'circulares',
  'ementas',
  'resultados',
  'informacoes',
  'matriculas',
  'outros'
);

-- ============================================
-- 2. PROFILES TABLE (extends auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'editor',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Only admins can manage profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'editor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. NEWS CATEGORIES
-- ============================================

CREATE TABLE news_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#1e40af',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE news_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News categories are viewable by everyone"
  ON news_categories FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can manage categories"
  ON news_categories FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. NEWS TABLE
-- ============================================

CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL, -- HTML from Tiptap
  excerpt TEXT,
  featured_image_url TEXT,
  category_id UUID REFERENCES news_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news are viewable by everyone"
  ON news FOR SELECT
  USING (
    status = 'published' 
    OR (auth.role() = 'authenticated' AND status IN ('draft', 'scheduled', 'archived'))
  );

CREATE POLICY "Authenticated users can create news"
  ON news FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own news"
  ON news FOR UPDATE
  USING (
    auth.uid() = author_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'secretary')
    )
  );

CREATE POLICY "Only admins/editors can delete news"
  ON news FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Index for better query performance
CREATE INDEX idx_news_status_published ON news(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_category ON news(category_id);
CREATE INDEX idx_news_featured ON news(is_featured, published_at DESC);

-- ============================================
-- 5. EVENTS TABLE
-- ============================================

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT, -- HTML from Tiptap
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  image_url TEXT,
  external_link TEXT,
  is_featured BOOLEAN DEFAULT false,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published events are viewable by everyone"
  ON events FOR SELECT
  USING (
    status = 'published'
    OR (auth.role() = 'authenticated')
  );

CREATE POLICY "Authenticated users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins/editors can delete events"
  ON events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE INDEX idx_events_status_date ON events(status, start_date ASC) WHERE status = 'published';
CREATE INDEX idx_events_slug ON events(slug);

-- ============================================
-- 6. STATIC PAGES TABLE
-- ============================================

CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT, -- HTML from Tiptap
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published pages are viewable by everyone"
  ON pages FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage pages"
  ON pages FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 7. DOCUMENTS TABLE
-- ============================================

CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category document_category NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  mime_type TEXT,
  download_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published documents are viewable by everyone"
  ON documents FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage documents"
  ON documents FOR ALL
  USING (auth.role() = 'authenticated');

CREATE INDEX idx_documents_category ON documents(category, is_published);

-- ============================================
-- 8. MEDIA/GALLERY TABLE
-- ============================================

CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  thumbnail_url TEXT,
  alt_text TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own media"
  ON media FOR UPDATE
  USING (
    auth.uid() = created_by 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Users can delete their own media"
  ON media FOR DELETE
  USING (
    auth.uid() = created_by 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 9. HIGHLIGHTS (Homepage Carousel) TABLE
-- ============================================

CREATE TABLE highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active highlights are viewable by everyone"
  ON highlights FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage highlights"
  ON highlights FOR ALL
  USING (auth.role() = 'authenticated');

CREATE INDEX idx_highlights_order ON highlights(order_index ASC, is_active DESC);

-- ============================================
-- 10. CONTACT MESSAGES TABLE
-- ============================================

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'geral', -- geral, secretaria, direcao
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 11. FUNCTIONS AND TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_highlights_updated_at BEFORE UPDATE ON highlights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 12. STORAGE BUCKETS
-- ============================================

-- Note: Storage buckets need to be created via Dashboard or API
-- Here are the policies to apply after creating buckets:

-- Bucket: 'news-images' (for news featured images)
-- Bucket: 'event-images' (for event images)
-- Bucket: 'documents' (for uploaded documents)
-- Bucket: 'media' (for gallery/media uploads)
-- Bucket: 'highlights' (for carousel images)
-- Bucket: 'avatars' (for user avatars)

-- Example storage policy (apply to each bucket):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Policy for public read access
-- CREATE POLICY "Public Access"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'news-images');

-- Policy for authenticated users to upload
-- CREATE POLICY "Authenticated Upload"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'news-images' 
--     AND auth.role() = 'authenticated'
--   );

-- ============================================
-- 13. SEED DATA - News Categories
-- ============================================

INSERT INTO news_categories (name, slug, color) VALUES
  ('Geral', 'geral', '#1e40af'),
  ('Académico', 'academico', '#059669'),
  ('Eventos', 'eventos', '#d97706'),
  ('Desporto', 'desporto', '#dc2626'),
  ('Cultura', 'cultura', '#7c3aed'),
  ('Projetos', 'projetos', '#0891b2'),
  ('Comunicados', 'comunicados', '#475569')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 14. SEED DATA - Static Pages
-- ============================================

INSERT INTO pages (title, slug, content, meta_description, is_published) VALUES
  (
    'A Escola',
    'a-escola',
    '<h1>Escola Secundária José Falcão</h1><p>Uma escola com história e tradição, virada para o futuro.</p>',
    'Conheça a Escola Secundária José Falcão, um dos primeiros Liceus de Portugal.',
    true
  ),
  (
    'História',
    'historia',
    '<h1>História da Escola</h1><p>Fundada em 1936 como Liceu D. João III, um dos primeiros três Liceus criados em Portugal.</p>',
    'A história centenária da Escola Secundária José Falcão.',
    true
  ),
  (
    'Oferta Educativa',
    'oferta-educativa',
    '<h1>Oferta Educativa</h1><p>Ensino Básico (3º Ciclo) e Ensino Secundário com diversos cursos.</p>',
    'Conheça a nossa oferta educativa.',
    true
  ),
  (
    'Serviços',
    'servicos',
    '<h1>Serviços</h1><p>Secretaria, Biblioteca, Serviços de Psicologia e Orientação.</p>',
    'Serviços disponíveis para a comunidade escolar.',
    true
  ),
  (
    'Contactos',
    'contactos',
    '<h1>Contactos</h1><p>Morada: Av. Dom Afonso Henriques, Apartado 2071, 3001-654 Coimbra</p><p>Telefone: 239 487 170/1/2</p>',
    'Como contactar a Escola Secundária José Falcão.',
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- END OF SCHEMA
-- ============================================
