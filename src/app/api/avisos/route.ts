import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') || '';
  const supabase = await createServerClient();

  let query = supabase.from('avisos').select('*').eq('status', 'published').order('is_pinned', { ascending: false }).order('published_at', { ascending: false });

  if (search) query = query.ilike('title', `%${search}%`);

  const { data } = await query;
  return NextResponse.json(data || []);
}
