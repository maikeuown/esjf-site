-- ============================================
-- AVISOS (Notices) Table
-- Add this to your Supabase SQL Editor
-- ============================================

CREATE TABLE avisos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT, -- HTML from Tiptap or plain text
  excerpt TEXT,
  priority TEXT DEFAULT 'normal', -- 'urgent', 'normal', 'low'
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, -- When the notice should no longer be displayed
  is_pinned BOOLEAN DEFAULT false, -- Pinned notices appear first
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published avisos are viewable by everyone"
  ON avisos FOR SELECT
  USING (
    status = 'published'
    OR (auth.role() = 'authenticated')
  );

CREATE POLICY "Authenticated users can create avisos"
  ON avisos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update avisos"
  ON avisos FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins/editors can delete avisos"
  ON avisos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Index for better query performance
CREATE INDEX idx_avisos_status_published ON avisos(status, published_at DESC, is_pinned DESC) WHERE status = 'published';
CREATE INDEX idx_avisos_slug ON avisos(slug);
CREATE INDEX idx_avisos_expires ON avisos(expires_at) WHERE status = 'published';

-- Auto-update updated_at timestamp
CREATE TRIGGER update_avisos_updated_at BEFORE UPDATE ON avisos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
