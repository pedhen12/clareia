import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ sales: [] });
    }

    // Obter todas as vendas ordenadas por data decrescente
    const { data, error } = await supabase
      .from('rifa_sales')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar vendas:', error);
      return NextResponse.json({ sales: [] });
    }

    return NextResponse.json({ sales: data || [] });
  } catch (error) {
    console.error('Erro na API de vendas:', error);
    return NextResponse.json({ sales: [] }, { status: 200 });
  }
}
