'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  completed_lessons: number;
  grade: string;
}

export default function RankingPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('points', { ascending: false })
          .limit(20);

        if (error) throw error;

        setLeaderboard(data || []);

        if (user) {
          const userIndex = data?.findIndex(entry => entry.id === user.id);
          if (userIndex !== undefined && userIndex !== -1) {
            setUserRank(userIndex + 1);
          }
        }
      } catch (err) {
        console.error('Error loading leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [user]);

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getAvatarEmoji = (index: number) => {
    const emojis = ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👦', '👧'];
    return emojis[index % emojis.length];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🏆 Ranking de Estudantes
        </h1>
        <p className="text-xl text-slate-400">
          Os melhores alunos da plataforma Clareia
        </p>
      </div>

      {loading ? (
        <div className="text-center text-white py-12">
          <div className="animate-spin text-6xl mb-4">⭐</div>
          <p>Carregando ranking...</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center text-slate-400 py-12">
          <p className="text-6xl mb-4">📊</p>
          <p className="text-xl">Ainda não há estudantes no ranking.</p>
          <p className="mt-2">Seja o primeiro a começar estudando!</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {leaderboard.slice(0, 3).map((student, index) => (
                <div
                  key={student.id}
                  className={`relative ${
                    index === 0 ? 'md:col-span-1 md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'
                  }`}
                >
                  <div
                    className={`bg-gradient-to-br rounded-lg p-6 text-center border ${
                      index === 0
                        ? 'from-yellow-600 to-yellow-700 border-yellow-500'
                        : index === 1
                          ? 'from-gray-600 to-gray-700 border-gray-500'
                          : 'from-amber-700 to-amber-800 border-amber-600'
                    } ${student.id === user?.id ? 'ring-4 ring-blue-500' : ''}`}
                  >
                    <div className="text-6xl mb-3">{getRankEmoji(index + 1)}</div>
                    <div className="text-5xl mb-4">{getAvatarEmoji(index)}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{student.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{student.grade}</p>
                    <div className="flex justify-around text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">{student.points}</p>
                        <p className="text-xs text-white/70">Pontos</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{student.completed_lessons}</p>
                        <p className="text-xs text-white/70">Aulas</p>
                      </div>
                    </div>
                    {student.id === user?.id && (
                      <div className="mt-4 bg-blue-500 text-white text-sm py-1 px-3 rounded-full inline-block">
                        Você está aqui!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Remaining Students */}
          {leaderboard.length > 3 && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              {leaderboard.slice(3).map((student, index) => {
                const rank = index + 4;
                const isCurrentUser = student.id === user?.id;
                
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50 transition-colors ${
                      isCurrentUser ? 'bg-blue-900/30 ring-2 ring-inset ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl font-bold text-slate-400 w-12 text-center">
                        #{rank}
                      </div>
                      <div className="text-4xl">{getAvatarEmoji(rank - 1)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {student.name}
                          {isCurrentUser && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                              Você
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-slate-400">{student.grade}</p>
                      </div>
                    </div>
                    <div className="flex gap-8 text-center">
                      <div>
                        <p className="text-xl font-bold text-yellow-400">{student.points}</p>
                        <p className="text-xs text-slate-400">Pontos</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-green-400">{student.completed_lessons}</p>
                        <p className="text-xs text-slate-400">Aulas</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* User's position if not in top 20 */}
          {userRank && userRank > 20 && (
            <div className="mt-8 bg-blue-900/30 border border-blue-500 rounded-lg p-6">
              <p className="text-center text-white">
                <span className="font-bold">Sua posição:</span> #{userRank}
              </p>
              <p className="text-center text-slate-400 text-sm mt-2">
                Continue estudando para subir no ranking!
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3">💡 Como subir no ranking?</h3>
            <ul className="text-slate-300 space-y-2">
              <li>✅ Complete aulas e assista todos os vídeos</li>
              <li>✅ Faça quizzes e acumule pontos</li>
              <li>✅ Participe regularmente da plataforma</li>
              <li>✅ Estude todos os dias para manter seu streak</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
