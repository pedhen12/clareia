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
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook signature ou secret ausente' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Erro ao verificar webhook:', error);
    return NextResponse.json({ error: 'Webhook signature inválida' }, { status: 400 });
  }

  try {
    // Processar eventos Stripe
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Atualizar status da venda para 'completed'
      const { error } = await supabase
        .from('rifa_sales')
        .update({ status: 'completed' })
        .eq('stripe_session_id', session.id);

      if (error) {
        console.error('Erro ao atualizar venda:', error);
      }

      console.log(`Pagamento confirmado para sessão: ${session.id}`);
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Atualizar status da venda para 'expired'
      const { error } = await supabase
        .from('rifa_sales')
        .update({ status: 'expired' })
        .eq('stripe_session_id', session.id);

      if (error) {
        console.error('Erro ao atualizar venda:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: 'Erro ao processar webhook' }, { status: 500 });
  }
}
