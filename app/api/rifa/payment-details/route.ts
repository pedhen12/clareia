import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID não fornecido' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paymentId: session.payment_intent,
      ticketNumbers: session.metadata?.ticketNumbers
        ? JSON.parse(session.metadata.ticketNumbers)
        : [],
      totalPrice: parseInt(session.metadata?.totalPrice || '0'),
      status: session.payment_status,
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar detalhes' },
      { status: 500 }
    );
  }
}
