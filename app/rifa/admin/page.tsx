'use client';

import { useState } from 'react';

interface Sale {
  id: string;
  stripe_session_id: string;
  ticket_numbers: number[];
  total_price: number;
  status: string;
  created_at: string;
  customer_email?: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    ticketsSold: 0,
    totalTickets: 100,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verificação básica - você pode melhorar isso depois
    if (password === process.env.NEXT_PUBLIC_RIFA_ADMIN_PASSWORD || password === 'admin123') {
      setAuthenticated(true);
      setPassword('');
      fetchSales();
    } else {
      alert('Senha incorreta');
    }
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rifa/admin/sales');
      const data = await response.json();
      setSales(data.sales || []);
      
      // Calcular estatísticas
      const completed = data.sales.filter((s: Sale) => s.status === 'completed');
      const totalRevenue = completed.reduce((sum: number, s: Sale) => sum + s.total_price, 0);
      const ticketsSold = completed.reduce((sum: number, s: Sale) => sum + s.ticket_numbers.length, 0);

      setStats({
        totalSales: completed.length,
        totalRevenue,
        ticketsSold,
        totalTickets: 100,
      });
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">Admin - Rifa</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard - Rifas</h1>
          <button
            onClick={() => {
              setAuthenticated(false);
              setSales([]);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sair
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Vendas Completadas</p>
            <p className="text-3xl font-bold text-emerald-600">{stats.totalSales}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Renda Total</p>
            <p className="text-3xl font-bold text-blue-600">
              R$ {stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Rifas Vendidas</p>
            <p className="text-3xl font-bold text-amber-600">
              {stats.ticketsSold}/{stats.totalTickets}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Disponíveis</p>
            <p className="text-3xl font-bold text-orange-600">
              {stats.totalTickets - stats.ticketsSold}
            </p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Vendas Recentes</h2>
              <button
                onClick={fetchSales}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Atualizar'}
              </button>
            </div>
          </div>

          {sales.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nenhuma venda completada
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Rifas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Qtd
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {new Date(sale.created_at).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {sale.ticket_numbers.sort((a, b) => a - b).map((num) => (
                            <span
                              key={num}
                              className="inline-block bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold"
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        {sale.ticket_numbers.length}
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-green-600">
                        R$ {sale.total_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
