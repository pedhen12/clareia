'use client';

import React from 'react';

interface CartProps {
  tickets: number[];
  ticketPrice: number;
  onRemove: (ticket: number) => void;
  onCheckout: () => void;
}

export function Cart({ tickets, ticketPrice, onRemove, onCheckout }: CartProps) {
  const total = tickets.length * ticketPrice;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">🛒 Seu Carrinho</h2>

      {tickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Nenhum número selecionado</p>
          <p className="text-gray-400 text-sm mt-2">Escolha números acima para começar</p>
        </div>
      ) : (
        <>
          {/* Lista de Tickets */}
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {tickets.sort((a, b) => a - b).map((ticket) => (
              <div
                key={ticket}
                className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <span className="font-semibold text-blue-900">#{ticket}</span>
                <button
                  onClick={() => onRemove(ticket)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg transition-colors"
                  title="Remover do carrinho"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="border-t-2 border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Quantidade:</span>
              <span className="font-bold">{tickets.length}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Valor unitário:</span>
              <span className="font-bold">R$ {ticketPrice.toFixed(2)}</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-300">
              <div className="flex justify-between items-baseline">
                <span className="text-amber-900 font-bold text-lg">Total:</span>
                <span className="text-2xl font-bold text-amber-900">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Botão de Checkout */}
          <button
            onClick={onCheckout}
            disabled={tickets.length === 0}
            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            💳 Ir para Pagamento
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Pagamento seguro via Stripe
          </p>
        </>
      )}
    </div>
  );
}
