'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaymentDetails {
  ticketNumbers?: number[];
  totalPrice?: number;
  paymentId?: string;
}

export default function SucessoPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchPaymentDetails(sessionId);
    }
  }, [sessionId]);

  const fetchPaymentDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/rifa/payment-details?session_id=${id}`);
      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
          {/* Ícone de Sucesso */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            ✓ Pagamento Confirmado!
          </h1>
          <p className="text-green-700 text-lg mb-8">
            Sua compra de rifas foi processada com sucesso
          </p>

          {/* Detalhes */}
          {!loading && paymentDetails && (
            <div className="bg-emerald-50 p-6 rounded-lg mb-8 text-left border-l-4 border-emerald-500">
              <h2 className="font-bold text-emerald-900 mb-4">Detalhes da compra:</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Números:</strong> {paymentDetails.ticketNumbers?.join(', ')}
                </p>
                <p>
                  <strong>Quantidade:</strong> {paymentDetails.ticketNumbers?.length || 0}
                </p>
                <p>
                  <strong>Total pago:</strong> R${' '}
                  {((paymentDetails.totalPrice || 0) / 100).toFixed(2)}
                </p>
                <p>
                  <strong>ID da transação:</strong> {paymentDetails.paymentId}
                </p>
              </div>
            </div>
          )}

          {/* Mensagem */}
          <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-200">
            <p className="text-blue-900 text-sm">
              Um e-mail de confirmação foi enviado para o e-mail associado à sua
              conta do Stripe. Guarde esse número de transação para referência.
            </p>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <Link
              href="/rifa"
              className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              ← Voltar para Rifa
            </Link>
            <Link
              href="/"
              className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Ir para Início
            </Link>
          </div>

          {/* Info Sorteio */}
          <div className="mt-8 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              <strong>Data do sorteio:</strong> 01/04/2026
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Resultado será divulgado no e-mail e no site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
