'use client';

import { useState, useEffect } from 'react';
import { TicketGrid } from '@/components/rifa/TicketGrid';
import { Cart } from '@/components/rifa/Cart';
import { loadStripe } from '@stripe/stripe-js';

const TOTAL_TICKETS = 100;
const TICKET_PRICE = 10;

export default function RifaPage() {
  const [soldTickets, setSoldTickets] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados de rifas vendidas da API
    fetchSoldTickets();
  }, []);

  const fetchSoldTickets = async () => {
    try {
      const response = await fetch('/api/rifa/sold-tickets');
      const data = await response.json();
      setSoldTickets(new Set(data.soldTickets));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar rifas vendidas:', error);
      setLoading(false);
    }
  };

  const toggleTicket = (ticketNumber: number) => {
    if (soldTickets.has(ticketNumber)) {
      return; // Não pode comprar rifas já vendidas
    }

    setCart(prev => {
      if (prev.includes(ticketNumber)) {
        return prev.filter(t => t !== ticketNumber);
      } else {
        return [...prev, ticketNumber];
      }
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch('/api/rifa/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNumbers: cart,
          totalPrice: cart.length * TICKET_PRICE,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
      
      if (stripe && sessionId) {
        // Redirecionar para o Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao processar pagamento');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">🎟️ Grande Rifa</h1>
          <p className="text-amber-700 text-lg">Contribua com o Palco Elite - Prêmio: Cesta de Páscoa</p>
          <p className="text-amber-600 mt-2">Valor do número: R$ {TICKET_PRICE.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grid Principal */}
          <div className="lg:col-span-2">
            <TicketGrid
              totalTickets={TOTAL_TICKETS}
              soldTickets={soldTickets}
              selectedTickets={new Set(cart)}
              onTicketClick={toggleTicket}
              ticketPrice={TICKET_PRICE}
            />
          </div>

          {/* Carrinho */}
          <div className="lg:col-span-1">
            <Cart
              tickets={cart}
              ticketPrice={TICKET_PRICE}
              onRemove={(ticket) => toggleTicket(ticket)}
              onCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-amber-900 mb-4">ℹ️ Informações</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-black mr-3">●</span>
              <span><strong>Números em preto:</strong> Rifas já vendidas</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-200 mr-3">●</span>
              <span><strong>Números em bege:</strong> Rifas disponíveis</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3">●</span>
              <span><strong>Números em azul:</strong> Selecionados no seu carrinho</span>
            </li>
            <li className="mt-4 text-sm text-gray-600">
              <strong>Contato:</strong> teatro.valqueira8b@gmail.com
            </li>
            <li className="text-sm text-gray-600">
              <strong>Data do sorteio:</strong> 01/04/2026
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
