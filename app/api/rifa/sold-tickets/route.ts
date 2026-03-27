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
      return NextResponse.json({ soldTickets: [] });
    }

    // Obter IDs de todos os tickets vendidos da tabela 'rifa_sales'
    const { data, error } = await supabase
      .from('rifa_sales')
      .select('ticket_numbers')
      .eq('status', 'completed');

    if (error) {
      console.error('Erro ao buscar rifas vendidas:', error);
      return NextResponse.json({ soldTickets: [] });
    }

    // Flatten array de números vendidos
    const soldTickets = data
      .flatMap((sale) => sale.ticket_numbers || [])
      .filter((ticket) => ticket !== null);

    return NextResponse.json({
      soldTickets: Array.from(new Set(soldTickets)),
    });
  } catch (error) {
    console.error('Erro na API de rifas vendidas:', error);
    return NextResponse.json({ soldTickets: [] }, { status: 200 });
  }
}
