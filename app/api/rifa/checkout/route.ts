import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-03-25.dahlia' })
  : null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { ticketNumbers, totalPrice } = await request.json();

    if (!ticketNumbers || ticketNumbers.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum número foi selecionado' },
        { status: 400 }
      );
    }

    // Criar sessão Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Rifa - Números: ${ticketNumbers.join(', ')}`,
              description: `${ticketNumbers.length} número(s) da Grande Rifa - Palco Elite`,
              images: [
                'https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=400', // Imagem genérica de rifa
              ],
            },
            unit_amount: Math.round(totalPrice * 100), // Converter para centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/rifa/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/rifa`,
      metadata: {
        ticketNumbers: JSON.stringify(ticketNumbers),
        totalPrice: totalPrice.toString(),
      },
    });

    // Salvar a compra pendente no banco de dados
    const { error } = await supabase
      .from('rifa_sales')
      .insert([
        {
          stripe_session_id: session.id,
          ticket_numbers: ticketNumbers,
          total_price: totalPrice,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Erro ao salvar venda:', error);
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
