'use client';

import React from 'react';

interface TicketGridProps {
  totalTickets: number;
  soldTickets: Set<number>;
  selectedTickets: Set<number>;
  onTicketClick: (ticketNumber: number) => void;
  ticketPrice: number;
}

export function TicketGrid({
  totalTickets,
  soldTickets,
  selectedTickets,
  onTicketClick,
}: TicketGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Escolha seus números</h2>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalTickets }, (_, i) => i + 1).map(
            (ticketNumber) => {
              const isSold = soldTickets.has(ticketNumber);
              const isSelected = selectedTickets.has(ticketNumber);

              let bgColor = 'bg-amber-100 hover:bg-amber-200 cursor-pointer';
              let textColor = 'text-amber-900';
              let ring = '';

              if (isSold) {
                bgColor = 'bg-gray-900 hover:bg-gray-900 cursor-not-allowed';
                textColor = 'text-white';
              } else if (isSelected) {
                bgColor = 'bg-blue-500 hover:bg-blue-600 cursor-pointer';
                textColor = 'text-white';
                ring = 'ring-2 ring-blue-300';
              }

              return (
                <button
                  key={ticketNumber}
                  onClick={() => onTicketClick(ticketNumber)}
                  disabled={isSold}
                  className={`
                    w-12 h-12 rounded-lg font-bold text-sm
                    transition-all duration-200
                    ${bgColor} ${textColor} ${ring}
                    flex items-center justify-center
                    shadow-md
                  `}
                  title={
                    isSold
                      ? 'Rifa vendida'
                      : isSelected
                      ? 'Clique para remover do carrinho'
                      : 'Clique para adicionar ao carrinho'
                  }
                >
                  {ticketNumber}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-8 pt-6 border-t border-gray-300">
        <p className="text-sm font-semibold text-gray-700 mb-3">Legenda:</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-900"></div>
            <span className="text-sm text-gray-700">Vendida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-100 border border-amber-300"></div>
            <span className="text-sm text-gray-700">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-700">No carrinho</span>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 rounded p-4">
          <p className="text-2xl font-bold text-gray-900">{soldTickets.size}</p>
          <p className="text-sm text-gray-600">Vendidas</p>
        </div>
        <div className="bg-amber-50 rounded p-4">
          <p className="text-2xl font-bold text-amber-900">{totalTickets - soldTickets.size}</p>
          <p className="text-sm text-amber-700">Disponíveis</p>
        </div>
        <div className="bg-blue-50 rounded p-4">
          <p className="text-2xl font-bold text-blue-900">{selectedTickets.size}</p>
          <p className="text-sm text-blue-700">No carrinho</p>
        </div>
      </div>
    </div>
  );
}
