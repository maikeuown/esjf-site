# Escola Secundária José Falcão — School Website

🇵🇹 [Versão portuguesa com guia completo de setup](README.pt.md)

A modern, fast, fully responsive website for Escola Secundária José Falcão (ESJF) in Coimbra, Portugal, one of the country's oldest secondary schools (founded in 1936). It has a public site for students, parents and visitors, and a role-based admin area where staff publish content without touching code.

## Tech stack

- **Framework:** Next.js 15 (App Router), TypeScript
- **UI:** Tailwind CSS, shadcn/ui, Radix UI
- **Back-end:** Supabase: PostgreSQL with Row Level Security, Auth (email/password and magic links), Storage
- **Forms:** React Hook Form
- **Rich text:** Tiptap (ProseMirror)
- **Calendar:** FullCalendar
- **Hosting:** Vercel, with on-demand Incremental Static Regeneration

## Public site

- Home page with highlights carousel, quick links, latest news and upcoming events
- The school: history, mission and values, management bodies, facilities
- Courses: basic, secondary and vocational education
- News with search, filters and pagination; events calendar; notices
- Projects (Erasmus+, Olympiads, school sports), services, digital platforms
- Documents organised by category, with download counts
- Contact form

## Admin area (`/admin`)

- Dashboard with counters, quick actions and recent activity
- News: rich-text editor, categories, draft / published / scheduled states, featured image
- Events, notices, documents, media library and homepage highlights
- Messages from the contact form
- User management with three roles: **admin** (full access), **editor** (news, events, documents) and **secretary** (communications and documents)

Content changes trigger on-demand revalidation, so public pages update without a redeploy.

## Security

- Row Level Security on the database tables, with role-based policies
- Admin routes protected by middleware
- The Supabase service-role key stays on the server and is never sent to the browser

## Getting started

```bash
git clone https://github.com/maikeuown/esjf-site.git
cd esjf-site
npm install
cp .env.local.example .env.local   # add your Supabase URL and keys
npm run dev                         # http://localhost:3000
```

Run `supabase/schema.sql` in the Supabase SQL editor to create the tables, policies and initial data. Full step-by-step setup, including storage buckets, the first admin user and Vercel deployment, is in [README.pt.md](README.pt.md).

## Project structure

```
src/
├── app/            # App Router: public pages, /admin, /login, API routes
├── components/     # UI (shadcn), layout, admin, news, events, documents, home
├── hooks/          # Custom React hooks
├── lib/supabase/   # Supabase clients (browser / server)
└── types/          # Database types
supabase/           # schema.sql, seed data
```

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```
