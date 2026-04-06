export type UserRole = 'admin' | 'editor' | 'secretary';
export type ContentStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type DocumentCategory = 
  | 'regulamentos'
  | 'circulares'
  | 'ementas'
  | 'resultados'
  | 'informacoes'
  | 'matriculas'
  | 'outros';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  status: ContentStatus;
  published_at: string | null;
  scheduled_for: string | null;
  is_featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  category?: NewsCategory;
  author?: Profile;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
  external_link: string | null;
  is_featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  description: string | null;
  category: DocumentCategory;
  file_url: string;
  file_name: string;
  file_size: number | null;
  mime_type: string | null;
  download_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  thumbnail_url: string | null;
  alt_text: string | null;
  created_by: string | null;
  created_at: string;
  creator?: Profile;
}

export interface Highlight {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string;
  link_url: string | null;
  link_text: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  is_read: boolean;
  created_at: string;
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      news_categories: {
        Row: NewsCategory;
        Insert: Omit<NewsCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<NewsCategory, 'id'>>;
      };
      news: {
        Row: News;
        Insert: Omit<News, 'id' | 'created_at' | 'updated_at' | 'views' | 'category' | 'author'>;
        Update: Partial<Omit<News, 'id' | 'category' | 'author'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id'>>;
      };
      pages: {
        Row: Page;
        Insert: Omit<Page, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Page, 'id'>>;
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'download_count'>;
        Update: Partial<Omit<Document, 'id'>>;
      };
      media: {
        Row: Media;
        Insert: Omit<Media, 'id' | 'created_at' | 'creator'>;
        Update: Partial<Omit<Media, 'id' | 'creator'>>;
      };
      highlights: {
        Row: Highlight;
        Insert: Omit<Highlight, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Highlight, 'id'>>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>;
        Update: Partial<Omit<ContactMessage, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
      document_category: DocumentCategory;
    };
  };
}
